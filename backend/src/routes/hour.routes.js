const express = require('express');
const router = express.Router();

const { 
  createHourEntry,
  getMyHourEntries,
  getCourseHours,
  updateHourEntry,
  deleteHourEntry
} = require('../controllers/hour.controller.js');

const auth = require('../middlewares/auth.middleware');

// Toutes les routes heures requièrent l'authentification
router.get('/me', auth, getMyHourEntries);        // Obtenir toutes ses propres heures
router.get('/:courseId', auth, getCourseHours);   // Obtenir toutes les heures d’un cours
router.post('/', auth, createHourEntry);          // Créer une saisie d’heure
router.put('/:id', auth, updateHourEntry);        // Modifier une saisie d’heure
router.delete('/:id', auth, deleteHourEntry);     // Supprimer une saisie d’heure


module.exports = router;
