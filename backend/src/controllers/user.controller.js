// user controller placeholder
const User = require('../models/User.model.js');
//Methode pour recuoer ou afficher
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Utilisateurs récupérés avec succès", users });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
};
const updateUser = async (req, res) => {
  try {
    const {id, name, email } = req.body;

    const updatdUser = await User.updateOne({id: id}, { name, email }, { new: true })

    if (!updatdUser) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.status(200).json({
      message: "Utilisateur modifié avec succès.",
     updatdUser,
     success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification de l'utilisateur.",
      error: error.message
    });
  }
};

const deletUser= async(req,res)=>{
try {
      const {id}=req.params
   const user = await User.deleteOne({ id : id})
    if (user.deletedCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
   res.status(201).json({message : "Uesr suprimer avec sucess"})  
} catch (error) {
   console.error("UTILISATEUR NON SUPRIMER" , error.message);
  res.status(500).json({message : "Erreur serveur"})
}
}

const updateStatutUser = async (req, res) => {
  try {
    const { statut } = req.body
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    )
    res.json({ message: 'Statut mis à jour', user: updated })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

const updateroleUser = async (req, res) => {
  try {
    const { role } = req.body
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    )
    res.json({ message: 'Rôle mis à jour', user: updated })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

module.exports = {getAllUsers,deletUser,updateUser,updateStatutUser, updateroleUser};
