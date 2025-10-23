const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
      maxlength: [50, "Le nom doit contenir au plus 50 caractères"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Veillez entrer un email valide",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Le mot de passe doit contenir au moins 8 caractères"],
    },
    role: {
      type: String,
      required: true,
      enum: ["etudiant", "admin", "formateur", "formateur_principal"],
      default: "etudiant",
      lowercase: true,
    },
    department:{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Departement',
        required: true
    },
    isActive: Boolean,
},{
    timestamps: true,
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
