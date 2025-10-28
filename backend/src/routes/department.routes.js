const express = require('express');
const {createDepartement ,assignFormateurToDepartement,getFormateursSansDepartement}= require('../controllers/department.controller')
const router = express.Router();
router.post('/assign',assignFormateurToDepartement )

router.post('/',createDepartement  )
router.get('/formateurs-disponibles', getFormateursSansDepartement);

module.exports = router;