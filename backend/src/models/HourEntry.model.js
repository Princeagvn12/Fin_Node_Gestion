const mongoose = require('mongoose');

const HourEntrySchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      trim: true,
      required: true,
    },
    hours: {
      type: Number, // ex : 2.5
      required: true,
      min: [0.25, "Au moins 0.25h"],
      max: [12, "Au plus 12h"],
    },

    description: {
      type: String, // optionnel
      trim: true,
    },
    // attendance: array of { student: ObjectId, status: 'present'|'absent' }
    attendance: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, enum: ['present', 'absent'], required: true }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const HourEntry = mongoose.model('HourEntry', HourEntrySchema)
module.exports = HourEntry;
