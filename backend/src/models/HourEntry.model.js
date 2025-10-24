const mongoose = require("mongoose");

const HourEntrySchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
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
      minlength: [1, "Au moins 1h de cours"],
      maxlength: [4, "Au plus 4h de cours"],
    },

    description: {
      type: String, // optionnel
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const HourEntry = mongoose.model('HourEntry', HourEntrySchema)
module.exports = HourEntry;
