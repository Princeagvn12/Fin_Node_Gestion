// middlewares/validateId.js

// On importe uniquement l'objet Types de mongoose pour vérifier les ObjectId
const { Types } = require("mongoose");

// Middleware qui valide l'ID passé dans l'URL
const validateId = (req, res, next) => {
  const { id } = req.params; // On récupère l'ID depuis les paramètres de la route
  const isValid = Types.ObjectId.isValid(id); // Vérifie si c'est un ObjectId MongoDB valide

  if (!isValid) {
    // Si l'ID n'est pas valide, on arrête la requête et on renvoie une erreur 400
    return res.status(400).json({ error: "ID invalide" });
  }

  // Si l'ID est valide, on passe au middleware ou contrôleur suivant
  next();
};

module.exports = validateId;
