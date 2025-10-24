// User model placeholder

const mongoose = require('mongoose')
const { Schema } = mongoose;
const { hashValue, verifyHash } = require('../utils/hash')
 
 
const UserSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departement',
        required: true
    },
    // ✅ Champ booléen avec valeur par défaut
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
});


/**
 * Middleware Mongoose "pre-save"
 * ------------------------------
 * Avant de sauvegarder un utilisateur, on vérifie si le mot de passe
 * a été modifié. Si oui, on le hash avec Argon2.
 */
UserSchema.pre("save", async function (next) {
    try {
      // Vérifie si le champ mot_de_passe est nouveau ou modifié
      if (this.isModified("password")) {
        this.password = await hashValue(this.password);
      }
      next();
    } catch (error) {
      next(error);
    }
  });
//   UserSchema.pre('save', async function (next) {

//   if (!this.isModified('password')) return next()
//   this.password = await hashValue(this.password)
//   next()
// })
  
  /**
   * Méthode personnalisée pour vérifier un mot de passe
   * ---------------------------------------------------
   * Compare un mot de passe en clair avec le hash stocké.
   */
  UserSchema.methods.verifyPassword = async function (mot_de_passe) {
    return await verifyHash(this.password, mot_de_passe);
  };

 
const User = mongoose.model('User', UserSchema);
module.exports = User;
