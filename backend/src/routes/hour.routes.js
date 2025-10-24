const express = require('express');
const router = express.Router();

const { 
  createHourEntry,
  getMyHourEntries,
  getCourseHours,
  updateHourEntry,
  deleteHourEntry
} = require('../controllers/hour.controller.js');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Toutes les routes heures requièrent l'authentification
router.get('/me', authMiddleware, getMyHourEntries);        // Obtenir toutes ses propres heures
router.get('/:courseId', authMiddleware, getCourseHours);   // Obtenir toutes les heures d’un cours
router.post('/', authMiddleware, createHourEntry);          // Créer une saisie d’heure
router.put('/:id', authMiddleware, updateHourEntry);        // Modifier une saisie d’heure
router.delete('/:id', authMiddleware, deleteHourEntry);     // Supprimer une saisie d’heure


module.exports = router;
