const mongoose = require("mongoose");

const departementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nom du département
    principalInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    }, // Formateur Principal
    
    numberOfCourses: { type: Number, default: 0 }, // Nombre de cours
    statut: { type: String, enum: ["Actif", "Inactif"], default: "Actif" }, // Statut du département
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Liste des utilisateurs liés
  },
  {
    timestamps: true,
  }
);

const Departement= mongoose.model("Departement", departementSchema);

module.exports = {Departement}