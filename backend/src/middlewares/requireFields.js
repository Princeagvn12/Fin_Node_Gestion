// middlewares/requireFields.js

/**
 * Middleware de validation des champs obligatoires
 * -----------------------------------------------
 * Ce middleware reçoit une liste de champs obligatoires.
 * Avant d'appeler le contrôleur, il vérifie que tous ces champs
 * sont bien présents dans req.body.
 * 
 * Si un ou plusieurs champs manquent, il renvoie une erreur 400
 * avec la liste des champs manquants.
 * Sinon, il appelle `next()` pour passer au contrôleur.
 */
const requireFields = (fields) => {
    return (req, res, next) => {
      // On filtre les champs qui ne sont pas présents dans req.body
      const missing = fields.filter((field) => !req.body[field]);
  
      // Si des champs manquent, on arrête ici et on renvoie une erreur
      if (missing.length > 0) {
        return res.status(400).json({
          message: "Certains champs obligatoires sont manquants",
          details: missing
        });
      }
  
      // Si tout est bon, on continue vers le contrôleur
      next();
    };
  };
  
  module.exports = requireFields;  