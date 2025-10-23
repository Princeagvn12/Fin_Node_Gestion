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
        teacher: {
            type: mongoose.Schema.Types.ObjectId, // User (formateur)
            ref: 'User'
        },
        // students: list of User ObjectId
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        // optional attendance summary is stored per HourEntry; keep schema small here
        
    },{
        timestamps: true,
    }
)

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course;
