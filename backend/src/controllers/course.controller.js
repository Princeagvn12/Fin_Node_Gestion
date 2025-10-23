// course controller placeholder
const Course =  require('../models/Course.model.js') 

// ✅ Créer un cours
// const createCourse = async (req, res) => {
//   try {
//     const course = new Course(req.body)
//     await course.save()
//     res.json({ success: true, data: course })
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message })
//   }
// }

const createCourse = async (req, res) => {
  try {
    const { title, description, department, mainTeacher } = req.body;

    const newCourse = new Course({
      title,
      description,
      department,  // ici c’est l’_id du département
      mainTeacher
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Lister les cours
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('department').populate('mainTeacher')
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ Affecter un formateur principal
const assignTeacher = async (req, res) => {
  try {
    const { courseId, teacherId } = req.body
    const course = await Course.findByIdAndUpdate(courseId, { mainTeacher: teacherId }, { new: true })
    res.json({ success: true, data: course })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ✅ Supprimer un cours
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Cours supprimé' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {createCourse, getCourses, assignTeacher, deleteCourse};
