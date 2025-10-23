const mongoose = require("mongoose");

const DepartementSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
      maxlength: [50, "Le nom doit contenir au plus 50 caractères"],
    },
    description: {
      type: String,
      trim: true,
    },
    mainTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Departement = mongoose.model('Departement', DepartementSchema);
module.exports = Departement;
