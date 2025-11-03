const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
      enum: ["etudiant", "admin", "formateur","formateur-principal", "rh"],
      default: "etudiant",
      lowercase: true,
    },
    statut: {
      type: String,
      enum: ['Actif', 'Inactif'],
      default: 'Actif'
    }
    ,
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departement',
        default: null
    },
    isActive: Boolean,
},{
    timestamps: true,
})

UserSchema.plugin(AutoIncrement, { inc_field: 'id' });
const User = mongoose.model('User', UserSchema);
module.exports = User;
