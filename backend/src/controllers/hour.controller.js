const HourEntry = require('../models/HourEntry.model');
const Course = require('../models/Course.model');

// teacher creates an hour entry; optionally includes attendance array
const createHour = async (req, res) => {
  try {
    const { courseId, date, hours, description, attendance } = req.body;
    const teacherId = req.user.id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    // only allow if teacher is assigned to the course or user is admin/formateur_principal
    if (course.teacher && course.teacher.toString() !== teacherId && !['admin','formateur_principal'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not allowed to create entry for this course' });
    }

    const entry = await HourEntry.create({ course: courseId, teacher: teacherId, date, hours, description, attendance });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get entries for the authenticated user (teacher: their entries; student: entries that include them in attendance)
const getMine = async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.user.role === 'formateur' || req.user.role === 'formateur_principal' || req.user.role === 'admin') {
      const entries = await HourEntry.find({ teacher: userId }).populate('course').populate('attendance.student');
      return res.json(entries);
    }
    // student view: entries where attendance contains the student or entries for their courses
    const entries = await HourEntry.find({ 'attendance.student': userId }).populate('course').populate('attendance.student');
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateHour = async (req, res) => {
  try {
    const id = req.params.id;
    const entry = await HourEntry.findById(id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.teacher.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    Object.assign(entry, req.body);
    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteHour = async (req, res) => {
  try {
    const id = req.params.id;
    const entry = await HourEntry.findById(id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.teacher.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await entry.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createHour, getMine, updateHour, deleteHour };

