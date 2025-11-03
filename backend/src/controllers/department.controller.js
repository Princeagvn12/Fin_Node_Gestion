// Exemple Express
const { Departement } = require("../models/Department.model.js");
const User = require("../models/User.model.js");

const assignFormateurToDepartement = async (req, res) => {
  try {
    const { userId, departementId } = req.body;
    const [user, departement] = await Promise.all([
      User.findById(userId),
      Departement.findById(departementId),
    ]);

    // const user = await User.findById(userId);
    // const departement = await Departement.findById(departementId);

    if (!user || !departement) {
      return res
        .status(404)
        .json({ message: "Utilisateur ou département introuvable." });
    }

    if (user.role !== "formateur-principal") {
      return res
        .status(400)
        .json({ message: "Seuls les formateurs peuvent être affectés." });
    }

    user.departement = departement._id;
    await user.save();

    return res.status(200).json({
      message: " Formateur attribué avec succès.",
      formateur: {
        id: user._id,
        nom: user.name,
        departement: departement.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const getFormateursSansDepartement = async (req, res) => {
  try {
    const formateurs = await User.find({
      role: "formateur-principal",
      departement: null,
    }).select('_id name email statut');

    return res.status(200).json(formateurs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des formateurs." });
  }
};

const createDepartement = async (req, res) => {
  try {
    const { principalInstructor, name, numberOfCourses } = req.body;

    // Vérification des champs obligatoires
    if (!name || numberOfCourses == null) {
      return res
        .status(400)
        .json({ message: "Nom et nombre de cours requis." });
    }

    // if (!name?.trim() || typeof numberOfCourses !== "number") {
    //       return res.status(400).json({ message: "Nom et nombre de cours requis." });
    //     }

    // Si un formateur est fourni, on vérifie qu'il existe et qu'il a le bon rôle
    let instructor = null;
    if (principalInstructor) {
      instructor = await User.findById(principalInstructor);
      if (!instructor || instructor.role !== "formateur-principal") {
        return res
          .status(400)
          .json({ message: "Formateur principal invalide ou inexistant." });
      }
    }

    // Création du département
    const newDepartement = await Departement.create({
      name,
      numberOfCourses,
      principalInstructor: instructor ? instructor._id : null,
    });

    res.status(201).json({
      message: "Département créé avec succès.",
      departement: newDepartement,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const getDepartements = async (req, res) => {
  try {
    const departements = await Departement.find()
      .populate('principalInstructor', 'name email statut') // Peupler les détails du formateur principal
      .lean(); // Utiliser lean() pour obtenir des objets JavaScript simples
    res.status(200).json({ departements });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
module.exports = {
  assignFormateurToDepartement,
  getFormateursSansDepartement,
  createDepartement,
  getDepartements,
};
