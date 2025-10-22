const HourEntry = require('../models/HourEntry.model');
const Course = require('../models/Course.model');
const mongoose = require('mongoose')

// Créer une entrée d'heure
async function createHourEntry(req, res) {
  try {
    const userId = req.user.id; // À adapter selon la structure d’authentification de l’équipe
    const { course, date, hours, description } = req.body;

    // Vérifier que le teacher du cours = user connecté
    const courseObj = await Course.findById(course);

    if (!courseObj || courseObj.teacher.toString() !== userId) {
      return res.status(403).json({ message: "Non autorisé à saisir des heures pour ce cours" });
    }

    const hourEntry = new HourEntry({ course, teacher: userId, date, hours, description });
    await hourEntry.save();
    res.status(201).json({ message: "Heure saisie", data: hourEntry });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la saisie", error: err.message });
  }
}

// Lister toutes les heures (filtrage par formateur)
async function getMyHourEntries(req, res) {
  try {
    const userId = req.user.id;
    const entries = await HourEntry.find({ teacher: userId }).populate("course teacher");
    res.status(200).json({ message: "Heures trouvées", data: entries });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Lister toutes les heures d’un cours (access admin/main teacher)
async function getCourseHours(req, res) {
  try {
    const { courseId } = req.params;
    const entries = await HourEntry.find({ course: courseId }).populate("teacher");
    res.status(200).json({ message: "Heures du cours trouvées", data: entries });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Modifier une entrée d’heure (uniquement par le formateur propriétaire)
async function updateHourEntry(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const entry = await HourEntry.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    if (entry.teacher.toString() !== userId) {
      return res.status(403).json({ message: "Non autorisé à modifier cette heure" });
    }

    Object.assign(entry, req.body);
    await entry.save();

    res.status(200).json({ message: "Heure modifiée", data: entry });
  } catch (err) {
    res.status(400).json({ message: "Erreur de modification", error: err.message });
  }
}

// Supprimer une entrée d’heure (uniquement par le formateur propriétaire)
async function deleteHourEntry(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const entry = await HourEntry.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    if (entry.teacher.toString() !== userId) {
      return res.status(403).json({ message: "Non autorisé à supprimer cette heure" });
    }

    await HourEntry.findByIdAndDelete(id);
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
