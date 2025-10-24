const express = require('express')
const router = express.Router();
const { register, login ,logout, refresh, guard} = require('../controllers/auth.controller.js')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware.js')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh', refresh)
router.get('/me',verifyTokenMiddleware, guard )

module.exports = router;