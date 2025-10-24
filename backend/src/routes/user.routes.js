// routes/users.js


/**
 * Route POST /users avec validations
 * ----------------------------------
 * Ordre des middlewares :
 * 1) requireFields : vérifie la présence des champs obligatoires
 * 2) validateEmailFormat : vérifie que l'email a un format valide
 * 3) checkEmailUnique : vérifie que l'email n'existe pas déjà en base
 * 4) createUser : contrôleur (logique métier)
 */

const express = require("express");
const router = express.Router();

// On importe le contrôleur qui contient la logique métier
const { createUser, getUsers, updateUser } = require("../controllers/userController");

const getUserByIdMiddleware = require("../middlewares/getUserById.middleware");

const validateId = require("../middlewares/validateId");

const isAdmin = require("../middlewares/isAdmin.middleware");

// On importe le middleware de validation des champs obligatoires
const requireFields = require("../middlewares/requireFields");

// On importe le middleware de validation du format de l'email
const validateEmailFormat = require("../middlewares/validateEmailFormat");

// On importe le middleware de validation d'unicité de l'email (MongoDB + Mongoose)
const checkEmailUnique = require("../middlewares/checkEmailUnique");


// Route POST : création d'un utilisateur
router.post(
    "/users",
    // Middleware : vérifie la présence des champs obligatoires
    requireFields(["name", "email", "password", "role", "departement"]),
    validateEmailFormat,
    checkEmailUnique,
    // Contrôleur : s'exécute uniquement si la validation est OK
    createUser
);

// Route GET : récupération de la liste des utilisateurs
router.get("/users", getUsers);

// Route GET : Lecture d’un utilisateur précis avec middleware
router.get("/users/:id", getUserByIdMiddleware, (req, res) => {
    // Ici, req.user contient déjà l'utilisateur trouvé
    res.status(200).json({ data: req.user });
});

// Route PUT : Mise à jour d'un utilisateur
// 1) validateId vérifie que l'ID est correct
// 2) updateUser exécute la logique métier si l'ID est valide
router.put("/users/:id", validateId, updateUser);

// Définition de la route DELETE /users/:id
// 1) validateId : middleware qui vérifie que l'ID fourni est un ObjectId valide
//    -> si invalide : la requête est stoppée avec une erreur 400
//    -> si valide : on passe au contrôleur
// 2) isAdmin : vérifie que l'utilisateur connecté est admin
// 3) deleteUser : contrôleur qui gère la logique métier de suppression
router.delete("/users/:id", validateId, isAdmin, deleteUser);

module.exports = router;

