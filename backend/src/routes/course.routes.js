// course routes placeholder
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware.js')
const roleMiddleware = require('../middlewares/role.middleware.js')

const { createCourse, getCourses, assignTeacher, deleteCourse } = require( '../controllers/course.controller.js')

router.post('/', createCourse)
router.post('/',authMiddleware, roleMiddleware, ) // a ajouter, createCourse

router.get('/', getCourses)
// router.get('/:id', ) // a ajouter , getCourseById
router.post('/assign-teacher', assignTeacher)
router.delete('/:id', deleteCourse)
router.put('/',authMiddleware, roleMiddleware, ) // a ajouter , updateCourse

module.exports = router;






