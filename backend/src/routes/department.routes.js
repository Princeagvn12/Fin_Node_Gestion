const express = require('express') 
const { createDepartment, getDepartments, deleteDepartment} = require('../controllers/department.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')
const roleMiddleware = require('../middlewares/role.middleware.js')

const router = express.Router()
router.post('/',authMiddleware,roleMiddleware, createDepartment, )
router.get('/', getDepartments)
// router.get('/:id', getDepartmentById)// a ajouter , getDepartmentById
router.delete('/:id',authMiddleware,roleMiddleware, deleteDepartment)
// router.put('/',authMiddleware, roleMiddleware, updateDepartment)// a ajouter , updateDepartment

module.exports = router;



