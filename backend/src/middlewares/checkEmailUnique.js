// middlewares/checkEmailUnique.js

/**
 * Middleware de validation d'unicité de l'email (MongoDB + Mongoose)
 * -----------------------------------------------------------------
 * Vérifie que l'email fourni n'existe pas déjà dans la collection "users".
 * 
 * Si l'email est déjà utilisé, on renvoie une erreur 400.
 * Sinon, on passe au middleware/contrôleur suivant.
 */

const User = require("../models/User");

const checkEmailUnique = async (req, res, next) => {
  try {
    const { email } = req.body;

    // On cherche un utilisateur avec le même email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé",
        details: { email }
      });
    }

    // Si aucun utilisateur trouvé, on continue
    next();
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur lors de la vérification de l'email" });
  }
};

module.exports = checkEmailUnique;