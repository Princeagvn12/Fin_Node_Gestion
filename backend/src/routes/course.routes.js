// course routes placeholder
const express = require('express')
const router = express.Router()

const { createCourse, getCourses, assignTeacher, deleteCourse } = require( '../controllers/course.controller.js')

router.post('/', createCourse)
router.get('/', getCourses)
router.post('/assign-teacher', assignTeacher)
router.delete('/:id', deleteCourse)

module.exports = router;

