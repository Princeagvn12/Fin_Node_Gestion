const User = require('../models/User.model');
const { hashValue } = require('../utils/hash');

// list users (with optional filters)
const listUsers = async (req, res) => {
  try {
    const { role, department, active } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (department) filter.department = department;
    if (active !== undefined) filter.isActive = active === 'true';
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email already used' });
    const hash = await hashValue(password);
    const user = await User.create({ name, email, password: hash, role, department });
    res.status(201).json({ ...user.toObject(), password: undefined });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) data.password = await hashValue(data.password);
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ message: 'Role is required' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleActive = async (req, res) => {
  try {
    const { active } = req.body;
    if (active === undefined) return res.status(400).json({ message: 'active is required' });
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: !!active }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { listUsers, getUser, createUser, updateUser, changeRole, toggleActive, deleteUser };
