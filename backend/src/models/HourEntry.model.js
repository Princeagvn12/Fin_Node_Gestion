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
    min: 0.25,
    validate: {
      validator: function(v) {
        // Ensure multiples of 0.25 (15 minutes)
        return Math.round(v * 100) % 25 === 0;
      },
      message: props => `${props.value} n'est pas un multiple de 0.25`
    }
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
