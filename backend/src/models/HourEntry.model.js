const mongoose = require("mongoose");

const hourEntrySchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course", 
    required: true 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  hours: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  description: { 
    type: String, 
    trim: true 
  }
}, {
  timestamps: true
});

const HourEntry = mongoose.model("HourEntry", hourEntrySchema);

module.exports = HourEntry;
