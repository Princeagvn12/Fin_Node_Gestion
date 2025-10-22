const express = require('express');
const router = express.Router();
const { 
  createHourEntry,
  getMyHourEntries,
  getCourseHours,
  updateHourEntry,
  deleteHourEntry
} = require('../controllers/hour.controller.js');


router.get('/me', getMyHourEntries);         // Obtenir toutes ses propres heures
router.get('/:courseId', getCourseHours);   // Obtenir toutes les heures d’un cours
router.post('/', createHourEntry);          // Créer une saisie d’heure
router.put('/:id', updateHourEntry);        // Modifier une saisie d’heure
router.delete('/:id', deleteHourEntry);     // Supprimer une saisie d’heure


module.exports = router;
