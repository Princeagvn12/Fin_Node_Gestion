// course controller placeholder
const Course =  require('../models/Course.model.js') 

const User = require('../models/User.model.js')

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
      department,  // department id
      teacher: mainTeacher // store as teacher
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
  const courses = await Course.find().populate('department').populate('teacher').populate('students')
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ Affecter un formateur principal
// assign teacher (formateur_principal or admin)
const assignTeacher = async (req, res) => {
  try {
    const { courseId, teacherId } = req.body;
    const teacher = await User.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    const course = await Course.findByIdAndUpdate(courseId, { teacher: teacherId }, { new: true });
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// add or remove student (formateur assigned to the course can manage students)
const updateStudents = async (req, res) => {
  try {
    const { courseId, studentId, action } = req.body; // action: add|remove
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (action === 'add') {
      if (!course.students.includes(studentId)) course.students.push(studentId);
    } else if (action === 'remove') {
      course.students = course.students.filter(s => s.toString() !== studentId);
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    await course.save();
    const populated = await Course.findById(courseId).populate('students').populate('teacher');
    res.json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Supprimer un cours
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Cours supprimé' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {createCourse, getCourses, assignTeacher, deleteCourse,updateStudents};
