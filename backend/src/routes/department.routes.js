const express = require('express') 
const { createDepartment, getDepartments, deleteDepartment, updateDepartment } = require('../controllers/department.controller.js')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')
const { ROLES } = require('../config/roles')

const router = express.Router()
// create (admin only)
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN]), createDepartment)
router.get('/', authMiddleware, getDepartments)
router.put('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), updateDepartment)
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), deleteDepartment)

module.exports = router;



