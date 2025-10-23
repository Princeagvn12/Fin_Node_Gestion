const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  mainTeacher: String
})

module.exports = mongoose.model('Course', courseSchema)
