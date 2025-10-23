const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { listUsers, getUser, createUser, updateUser, changeRole, toggleActive, deleteUser } = require('../controllers/user.controller');

// Public create could be restricted; we'll protect with RH or ADMIN where needed
router.get('/', authMiddleware, roleMiddleware(['admin','rh']), listUsers);
router.get('/:id', authMiddleware, roleMiddleware(['admin','rh']), getUser);
router.post('/', authMiddleware, roleMiddleware(['admin','rh']), createUser);
router.patch('/:id', authMiddleware, roleMiddleware(['admin','rh']), updateUser);
router.patch('/:id/role', authMiddleware, roleMiddleware(['admin','rh']), changeRole);
router.patch('/:id/active', authMiddleware, roleMiddleware(['admin','rh']), toggleActive);
router.delete('/:id', authMiddleware, roleMiddleware(['admin','rh']), deleteUser);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth.middleware');
// const roleMiddleware = require('../middlewares/role.middleware');
// const { createUser, listUsers, changeRole, toggleActive, getUser } = require('../controllers/user.controller');
// const { ROLES } = require('../config/roles');

// // public: get user by id (or authenticated user's profile elsewhere)
// router.get('/:id', authMiddleware, getUser);

// // admin/rh create users and list
// router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.RH]), createUser);
// router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.RH]), listUsers);

// // change role (admin/rh)
// router.patch('/:id/role', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.RH]), changeRole);

// // toggle active
// router.patch('/:id/active', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.RH]), toggleActive);

// module.exports = router;
