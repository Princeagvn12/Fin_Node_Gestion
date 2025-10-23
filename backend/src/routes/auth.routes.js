const express = require('express')
const router = express.Router();
const { register, login ,logout, refresh} = require('../controllers/auth.controller.js')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh', refresh)
// router.get('/home', )

module.exports = router;
