const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    code: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // formateur principal
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // étudiants
  }, {
    timestamps: true, // ajoute createdAt et updatedAt automatiquement
  });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
