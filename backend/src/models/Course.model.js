const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        code: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type:  String,
            trim: true
        },
        department:{
            type: mongoose.Schema.Types.ObjectId, // Department
            ref: 'Departement',
            required: true
        },
        mainTeacher: {
            type: mongoose.Schema.Types. ObjectId, // User (formateur)
            ref: 'User',
            required: true
        },
        students: [mongoose.Schema.Types.ObjectId], // Liste d’étudiants
        
    },{
        timestamps: true,
    }
)

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course;
