const HourEntry = require('../models/HourEntry.model');
const Course = require('../models/Course.model');

// Helper: check role teacher
function userIsTeacher(user) {
  return user && (user.role === 'formateur' || user.role === 'formateur_principal');
}

// Créer une entrée d'heure
async function createHourEntry(req, res) {
  try {
    if (!userIsTeacher(req.user)) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const { course, date, hours, description } = req.body;

    // vérifier que le cours existe
    const courseObj = await Course.findById(course);
    if (!courseObj) return res.status(400).json({ message: 'Course introuvable' });

    // Optionnel : vérifier que le formateur est bien affecté au cours (ou qu'il est formateur_principal)
    if (String(courseObj.teacher) !== String(req.user._id) && req.user.role !== 'formateur_principal') {
      return res.status(403).json({ message: 'Vous n’êtes pas autorisé à saisir des heures pour ce cours' });
    }

    const hourEntry = new HourEntry({
      course,
      teacher: req.user._id,
      date,
      hours,
      description
    });

    await hourEntry.save();
    res.status(201).json({ message: "Heure saisie avec succès", data: hourEntry });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la saisie", error: err.message });
  }
}

// Lister toutes les heures d'un formateur
async function getMyHourEntries(req, res) {
  try {
    if (!userIsTeacher(req.user)) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const entries = await HourEntry.find({ teacher: req.user._id }).populate('course', 'title');
    res.status(200).json({ message: "Heures trouvées", data: entries });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Lister toutes les heures d'un cours
async function getCourseHours(req, res) {
  try {
    const { courseId } = req.params;
    const entries = await HourEntry.find({ course: courseId }).populate('course', 'title');
    res.status(200).json({ message: "Heures du cours trouvées", data: entries });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Modifier une entrée d'heure
async function updateHourEntry(req, res) {
  try {
    if (!userIsTeacher(req.user)) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const { id } = req.params;
    // whitelist des champs modifiables
    const allowed = {};
    ['date', 'hours', 'description', 'startTime', 'endTime'].forEach(k => {
      if (req.body[k] !== undefined) allowed[k] = req.body[k];
    });

    const entry = await HourEntry.findOneAndUpdate(
      { _id: id, teacher: req.user._id },
      allowed,
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    res.status(200).json({ message: "Heure modifiée avec succès", data: entry });
  } catch (err) {
    res.status(400).json({ message: "Erreur de modification", error: err.message });
  }
}

// Supprimer une entrée d'heure 
async function deleteHourEntry(req, res) {
  try {
    if (!userIsTeacher(req.user)) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const { id } = req.params;
    const entry = await HourEntry.findOneAndDelete({ _id: id, teacher: req.user._id });

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", error: err.message });
  }
}

module.exports = {
  createHourEntry,
  getMyHourEntries,
  getCourseHours,
  updateHourEntry,
  deleteHourEntry
};