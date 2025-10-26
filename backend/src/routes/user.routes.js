// user routes placeholder
const express = require('express');

const { getAllUsers,deletUser,updateUser,updateStatutUser,updateroleUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers )
router.put("/", updateUser)
router.delete("/:id", deletUser)
router.patch('/:id/statut', updateStatutUser);
router.patch('/:id/role', updateroleUser);
module.exports = router;
