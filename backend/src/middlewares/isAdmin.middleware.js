// middlewares/isAdmin.js
const isAdmin = (req, res, next) => {
    try {
      // On suppose que req.user est déjà rempli par un middleware d'authentification
      if (!req.user) {
        return res.status(401).json({ error: "Non authentifié" });
      }
  
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Accès interdit : réservé aux administrateurs" });
      }
  
      // Si admin, on continue
      next();
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur lors de la vérification des droits" });
    }
  };
  
  module.exports = isAdmin;
  