const express = require('express');
const router = express.Router()
const { } = require('../controllers/course.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')
const roleMiddleware = require('../middlewares/role.middleware.js')

router.get('/', )

router.get('/:id', )

router.post('/', authMiddleware, roleMiddleware, )

router.put('/', authMiddleware, roleMiddleware, )

router.delete('/:id', authMiddleware, roleMiddleware, )

module.exports = router;
