const mongoose = require('mongoose')
const Course = require('../models/Course.model.js')

// Lister tous les cours
async function getCourse(req, res) {
  try {
    const courses = await Course.find().populate('department teacher students');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtenir un cours précis par son ID
async function getCourseById(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('department teacher students');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Créer un nouveau cours
async function createCourse(req, res) {
  try {
    // Données reçues via req.body
    const { title, code, description, department, teacher, students } = req.body;
    const newCourse = new Course({ title, code, description, department, teacher, students });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Modifier un cours par son ID
async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const course = await Course.findByIdAndUpdate(id, updates, { new: true }).populate('department teacher students');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Supprimer un cours par son ID
async function deleteCourse(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Course not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*
  Lister les étudiants associés à un cours
  GET : /courses/:id/students
*/
async function getStudentsToCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('students');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course.students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*
  Associer un étudiant à un cours
  POST : /courses/:id/students
  Body: { studentId }
*/
async function assignStudentToCourse(req, res) {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/*
  Retirer un étudiant d'un cours
  DELETE : /courses/:id/students/:studentId
*/
async function removeStudentFromCourse(req, res) {
  try {
    const { id, studentId } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.students = course.students.filter(
      (student) => student.toString() !== studentId
    );
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/*
  Affecter un formateur principal à un cours
  PUT : /courses/:id/teacher
  Body: { teacherId }
*/
async function assignTeacherToCourse(req, res) {
  try {
    const { id } = req.params;
    const { teacherId } = req.body;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.teacher = teacherId;
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getStudentsToCourse,
  assignStudentToCourse,
  assignTeacherToCourse,
  removeStudentFromCourse
};
