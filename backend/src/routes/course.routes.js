const express = require('express');
const router = express.Router();
const { 
  getCourse, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  getStudentsToCourse, 
  assignStudentToCourse, 
  assignTeacherToCourse, 
  removeStudentFromCourse 
} = require('../controllers/course.controller.js');


router.get('/', getCourse);                           // Lister tous les cours
router.get('/:id', getCourseById);                    // Obtenir un cours par son id
router.get('/:id/students', getStudentsToCourse);     // Lister les étudiants d’un cours
router.post('/', createCourse);                       // Créer un cours
router.post('/:id/students', assignStudentToCourse);  // Ajouter un étudiant dans un cours
router.put('/:id', updateCourse);                     // Modifier un cours
router.put('/:id/teacher', assignTeacherToCourse);    // Affecter un formateur principal à un cours
router.delete('/:id', deleteCourse);                  // Supprimer un cours
router.delete('/:id/students/:studentId', removeStudentFromCourse); // Retirer un étudiant d’un cours


module.exports = router;
