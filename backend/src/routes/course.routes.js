const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

const { createCourse, getCourses, assignTeacher, deleteCourse, updateStudents } = require('../controllers/course.controller')

// Create course: admin or formateur_principal
router.post('/', authMiddleware, roleMiddleware(['admin','formateur_principal']), createCourse)

// List
router.get('/', authMiddleware, getCourses)

// assign teacher (formateur_principal or admin)
router.post('/assign-teacher', authMiddleware, roleMiddleware(['admin','formateur_principal']), assignTeacher)

// add/remove students (formateur assigned to course or formateur_principal)
router.patch('/students', authMiddleware, roleMiddleware(['formateur','formateur_principal','admin']), updateStudents)

router.delete('/:id', authMiddleware, roleMiddleware(['admin','formateur_principal']), deleteCourse)

module.exports = router;


// // assign teacher (formateur_principal or admin)
// router.post('/assign-teacher', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.FORMATEUR_PRINCIPAL]), assignTeacher)

// // update students list (formateur or formateur_principal)
// router.post('/students', authMiddleware, roleMiddleware([ROLES.FORMATEUR, ROLES.FORMATEUR_PRINCIPAL]), updateStudents)

// // delete (admin)
// router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), deleteCourse)

module.exports = router;
// // course routes placeholder
// const express = require('express')
// const router = express.Router()
// const authMiddleware = require('../middlewares/auth.middleware.js')
// const roleMiddleware = require('../middlewares/role.middleware.js')

// const { createCourse, getCourses, assignTeacher, deleteCourse } = require( '../controllers/course.controller.js')

// router.post('/', createCourse)
// router.post('/',authMiddleware, roleMiddleware, ) // a ajouter, createCourse

// router.get('/', getCourses)
// // router.get('/:id', ) // a ajouter , getCourseById
// router.post('/assign-teacher', assignTeacher)
// router.delete('/:id', deleteCourse)
// router.put('/',authMiddleware, roleMiddleware, ) // a ajouter , updateCourse

// module.exports = router;






