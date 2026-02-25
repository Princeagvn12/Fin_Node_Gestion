// middlewares/getUserById.js

const mongoose = require("mongoose");
const User = require("../models/User.model");

/**
 * Middleware pour charger un utilisateur par son ID
 * ------------------------------------------------
 * Étapes :
 * 1) Vérifier que l'ID est valide
 * 2) Chercher l'utilisateur en base
 * 3) Gérer le cas "non trouvé"
 * 4) Attacher l'utilisateur à req.user pour la suite
 */
const getUserByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  // 1) Vérifier que l'ID est bien un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  try {
    // 2) Chercher l'utilisateur en base
    const user = await User.findById(id).select("password");

    // 3) Gérer le cas "non trouvé"
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // 4) Attacher l'utilisateur trouvé à la requête
    req.user = user;
    next(); // passer au contrôleur suivant
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur lors de la recherche de l'utilisateur" });
  }
};

module.exports = getUserByIdMiddleware;