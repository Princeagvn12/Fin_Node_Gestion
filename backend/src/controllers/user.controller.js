// controllers/userController.js

const mongoose = require("mongoose");
const User = require("../models/User.model");
const { hashValue, verifyHash } = require('../utils/hash')

/**
 * Récupérer la liste des utilisateurs
 * -----------------------------------
 * - Filtrage : par rôle, statut, département
 * - Pagination : page & limit
 * - Tri : champ + ordre
 */
const getUsers = async (req, res) => {
    try {
        // Récupération des paramètres de requête avec valeurs par défaut
        const {
            page = 1,
            limit = 10,
            role,
            isActive,
            departement,
            sort = "createdAt",
            order = "desc",
            search
        } = req.query;

        // Construction du filtre
        const filter = {};
        if (role) filter.role = role;
        if (isActive !== undefined) filter.isActive = isActive === "true";
        if (departement) filter.departement = Number(departement);

        // 🔎 Ajout de la recherche textuelle
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },       // insensible à la casse
                { email: { $regex: search, $options: "i" } }
            ];
        }

        // Requête MongoDB avec filtres, pagination et tri
        const users = await User.find(filter)
            .sort({ [sort]: order === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select("mot_de_passe"); // ⚠️ on exclut le mot de passe

        // Compter le total pour la pagination
        const total = await User.countDocuments(filter);

        res.status(200).json({
            data: users,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de la récupération des utilisateurs" });
    }
};




/**
 * Création d'un utilisateur
 * -----------------------
 * Ici, on ne s’occupe plus du hashage du mot de passe.
 * Le middleware Mongoose (pre-save) dans le modèle User
 * se charge automatiquement de hasher le mot de passe avec Argon2.
 */
const createUser = async (req, res) => {
    try {
        // On récupère les données envoyées par le frontend
        const { name, email, password, role, departement } = req.body;

        // 1️⃣ Création d'un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password, // ⚠️ on passe le mot de passe en clair
            role,
            departement,
            isActive // si non fourni → prendra la valeur par défaut true
            // createdAt et updatedAt sont gérés automatiquement
        });

        // 2️⃣ Sauvegarde en base (le hashage se fait automatiquement via le middleware)
        await newUser.save();

        // 3️⃣ Réponse au frontend (sans renvoyer le mot de passe)
        return res.status(201).json({
            message: "Utilisateur créé avec succès",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                departement: newUser.departement,
                isActive: newUser.isActive
            }
        });
    } catch (error) {
        // Si une erreur imprévue survient, on renvoie une erreur 500
        return res.status(500).json({ error: "Erreur serveur lors de la création de l'utilisateur" });
    }
};




/**
 * Mise à jour des informations d'un utilisateur
 * --------------------------------------------
 */
const updateUser = async (req, res) => {
  const { id } = req.params; // On récupère l'ID validé par le middleware

  try {
    // Étape 2 : Recherche de l'utilisateur
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Étape 3 : Mise à jour des champs autorisés
    const allowedFields = ["name", "email", "role", "departement", "isActive", "password"];
    for (let field of allowedFields) {
      if (req.body[field] !== undefined) {
        foundUser[field] = req.body[field];
      }
    }

    // Étape 4 : Hashage du mot de passe si modifié
    if (req.body.password) {
      foundUser.password = await hashValue(req.body.password);
    }

    // Étape 5 : Sauvegarde en base
    await foundUser.save();

    // Étape 6 : Retourner l'utilisateur mis à jour (sans mot de passe)
    const { password, ...userData } = foundUser.toObject();

    return res.status(200).json({
      message: "Utilisateur mis à jour avec succès ✅",
      data: userData
    });

  } catch (error) {
    // Gestion des erreurs serveur
    return res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur" });
  }
};



/**
 * Suppression d'un utilisateur
 * --------------------------------------------
 */
const deleteUser = async (req, res) => {
  const { id } = req.params; // On récupère l'ID validé par le middleware

  try {
    // Étape 2 : Recherche de l'utilisateur
    // On vérifie si un utilisateur existe avec cet ID
    const foundUser = await User.findById(id);
    if (!foundUser) {
      // Si aucun utilisateur trouvé, on renvoie une erreur 404
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Étape 3 : Suppression en base
    // On supprime l'utilisateur trouvé
    await User.findByIdAndDelete(id);

    // Étape 4 : Retourner une réponse claire
    // On confirme la suppression et on peut renvoyer quelques infos utiles
    return res.status(200).json({
      message: "Utilisateur supprimé avec succès ✅",
      deletedUser: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email
      }
    });

  } catch (error) {
    // Gestion des erreurs serveur (ex: problème de connexion à MongoDB)
    return res.status(500).json({ error: "Erreur serveur lors de la suppression de l'utilisateur" });
  }
};


module.exports = { createUser, getUsers, updateUser, deleteUser  };
