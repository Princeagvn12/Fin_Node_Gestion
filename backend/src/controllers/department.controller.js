// controllers/departmentController.js

const Department = require('../models/Department.model');

// ✅ Créer un département
const createDepartment = async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.json({ success: true, data: dept });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Lister tous les départements
const getDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.json(depts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Supprimer un département
const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Département supprimé' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Exporter les fonctions (CommonJS)
module.exports = {
  createDepartment,
  getDepartments,
  deleteDepartment,
};
