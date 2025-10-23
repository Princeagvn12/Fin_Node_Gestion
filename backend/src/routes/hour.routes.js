const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { createHour, getMine, updateHour, deleteHour } = require('../controllers/hour.controller');

// create hour entry (formateur, formateur_principal, admin)
router.post('/', authMiddleware, roleMiddleware(['formateur','formateur_principal','admin']), createHour);

// get my entries
router.get('/me', authMiddleware, getMine);

router.patch('/:id', authMiddleware, roleMiddleware(['formateur','formateur_principal','admin']), updateHour);
router.delete('/:id', authMiddleware, roleMiddleware(['formateur','formateur_principal','admin']), deleteHour);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth.middleware');
// const roleMiddleware = require('../middlewares/role.middleware');
// const { ROLES } = require('../config/roles');
// const { createHourEntry, getMyHours, updateAttendance, deleteHour } = require('../controllers/hour.controller');

// // teachers (and formateur_principal/admin) create hour entries
// router.post('/', authMiddleware, roleMiddleware([ROLES.FORMATEUR, ROLES.FORMATEUR_PRINCIPAL, ROLES.ADMIN]), createHourEntry);

// // get entries for current user or all for admin
// router.get('/me', authMiddleware, getMyHours);

// // update attendance
// router.patch('/attendance', authMiddleware, roleMiddleware([ROLES.FORMATEUR, ROLES.FORMATEUR_PRINCIPAL, ROLES.ADMIN]), updateAttendance);

// // delete
// router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.FORMATEUR, ROLES.FORMATEUR_PRINCIPAL]), deleteHour);

// module.exports = router;
