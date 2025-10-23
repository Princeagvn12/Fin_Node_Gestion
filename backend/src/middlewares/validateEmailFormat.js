// middlewares/validateEmailFormat.js

/**
 * Middleware de validation du format de l'email
 * ---------------------------------------------
 * Vérifie que req.body.email existe (déjà garanti si requireFields est utilisé)
 * et qu'il correspond à un format d'email valide.
 * 
 * En cas d'email invalide, renvoie 400 avec un message explicite.
 * Sinon, passe au middleware/contrôleur suivant.
 */
const validateEmailFormat = (req, res, next) => {
    const { email } = req.body;
  
    // Expression régulière simple et robuste pour les cas courants
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Si l'email n'est pas dans un format valide
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
        details: { email }
      });
    }
  
    // Tout est bon, on continue
    next();
  };
  
  module.exports = validateEmailFormat;  