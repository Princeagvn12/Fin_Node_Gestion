const express = require('express');
const {createDepartement,getDepartements ,assignFormateurToDepartement,getFormateursSansDepartement}= require('../controllers/department.controller')
const router = express.Router();
router.post('/assign',assignFormateurToDepartement)

router.get('/',getDepartements )
router.post('/',createDepartement  )
router.get('/formateurs-sans-disponibles', getFormateursSansDepartement);

module.exports = router;