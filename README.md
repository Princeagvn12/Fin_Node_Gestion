```markdown
Voici un **cahier des charges complet** pour ton projet de **Gestion d’employés et de saisie d’heures** (université, 6 départements), avec technologies : **Vue 3 (Front)** + **Node.js/Express (Back)** + **MongoDB (BDD)**.

---

# 🧾 **Cahier des charges technique et fonctionnel**

## 1. 📘 Contexte du projet

L’université souhaite disposer d’une application web de **gestion d’employés et de saisie d’heures**.
L’objectif est de simplifier :

* la **gestion du personnel** (RH, formateurs, étudiants) ;
* la **saisie et le suivi des heures de cours** ;
* l’**affectation des étudiants** aux cours et départements.

Le projet doit être accessible en ligne via un navigateur et compatible sur ordinateur, tablette et mobile.

---

## 2. 🎯 Objectifs du projet

* Permettre à la **Direction / RH** de gérer les utilisateurs et les départements.
* Permettre aux **formateurs principaux** de gérer les cours et les étudiants de leur département.
* Permettre aux **formateurs** de saisir les heures pour leurs cours.
* Permettre aux **étudiants** de consulter leurs cours et leurs heures.
* Garantir un **contrôle des accès** selon les rôles (Administrateur, RH, Formateur Principal, Formateur, Étudiant).

---

## 3. 👥 Utilisateurs et rôles

| Rôle                    | Description                        | Permissions principales                                                                    |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| **Administrateur**      | Gère toute la plateforme           | CRUD utilisateurs, CRUD départements, gestion des rôles, affectation formateurs principaux |
| **RH**                  | Gère les employés et rôles         | CRUD utilisateurs, changement de rôle, affectations                                        |
| **Formateur Principal** | Responsable d’un département       | Gère les cours, étudiants, affectations et désactivations                                  |
| **Formateur**           | Enseigne un ou plusieurs cours     | Saisie des heures pour ses cours                                                           |
| **Étudiant**            | Suit des cours dans un département | Consulte ses cours et heures                                                               |

---

## 4. 🧩 Fonctionnalités principales

### 4.1. Authentification et Sécurité

* Inscription / Connexion / Déconnexion (JWT)
* Gestion des rôles et des permissions
* Réinitialisation du mot de passe
* Middleware d’autorisation (backend)

### 4.2. Gestion des Utilisateurs (RH / Admin)

* Ajouter, modifier, supprimer un utilisateur
* Affecter un rôle (étudiant, formateur, formateur principal)
* Affecter un formateur principal à un département
* Désactiver / réactiver un utilisateur

### 4.3. Gestion des Départements (Admin)

* Créer, modifier, supprimer un département
* Lister les départements
* Associer un formateur principal à un département

### 4.4. Gestion des Cours (Formateur principal)

* Créer, modifier, supprimer un cours
* Affecter un formateur à un cours
* Affecter ou désaffecter un étudiant à un cours

### 4.5. Saisie des Heures (Formateur / Formateur principal)

* Saisir le nombre d’heures effectuées pour un cours donné
* Consulter son historique de saisies
* Modification ou suppression de saisies récentes

### 4.6. Gestion des Étudiants (Formateur principal)

* Lister les étudiants du département
* Désactiver un étudiant (en cas de renvoi)
* Affecter / désaffecter un étudiant à un cours

### 4.7. Consultation des Heures (Étudiant)

* Consulter ses cours affectés
* Voir les heures de cours enregistrées
* Téléchargement en PDF (optionnel)

---

## 5. 🗂️ Modélisation des données (MongoDB)

### 5.1. **Modèle User**

```js
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: String, // 'admin', 'rh', 'formateur_principal', 'formateur', 'etudiant'
  department: ObjectId, // Référence vers Department
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.2. **Modèle Department**

```js
{
  _id: ObjectId,
  name: String, // Ex: "Informatique", "Mathématiques"
  description: String,
  mainTeacher: ObjectId, // User (formateur principal)
  createdAt: Date,
  updatedAt: Date
}
```

### 5.3. **Modèle Course**

```js
{
  _id: ObjectId,
  title: String,
  code: String,
  description: String,
  department: ObjectId, // Department
  teacher: ObjectId, // User (formateur)
  students: [ObjectId], // Liste d’étudiants
  createdAt: Date,
  updatedAt: Date
}
```

### 5.4. **Modèle HourEntry**

```js
{
  _id: ObjectId,
  course: ObjectId,
  teacher: ObjectId,
  date: Date,
  hours: Number, // ex : 2.5
  description: String, // optionnel
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. ⚙️ Architecture technique

### Frontend : **Vue 3 (Composition API) + Vue Router + TailwindCSS**

* Composants réutilisables (Form, Table, Modal)
* Vue Router avec guards pour les rôles
* Store global pour la gestion de l’utilisateur connecté
* Axios pour les appels API

### Backend : **Node.js + Express + Mongoose**

* Routes sécurisées par middleware JWT
* Routes groupées par ressource : `/auth`, `/users`, `/departments`, `/courses`, `/hours`
* Gestion d’erreurs centralisée
* Validation des données avec Joi ou Zod

### Base de données : **MongoDB + Mongoose**

* Relations via références (`ObjectId`)
* Indexation sur les champs utilisés en recherche (email, department, course)

---

## 7. 🧱 Structure des routes (exemples backend)

| Ressource  | Méthode | Route                   | Rôle requis              |
| ---------- | ------- | ----------------------- | ------------------------ |
| Auth       | POST    | `/auth/login`           | Public                   |
| Auth       | POST    | `/auth/register`        | RH / Admin               |
| User       | GET     | `/users`                | RH / Admin               |
| User       | PATCH   | `/users/:id/role`       | RH / Admin               |
| Department | GET     | `/departments`          | Tous                     |
| Department | POST    | `/departments`          | Admin                    |
| Course     | POST    | `/courses`              | Formateur principal      |
| Course     | PATCH   | `/courses/:id/students` | Formateur principal      |
| Hours      | POST    | `/hours`                | Formateur / Principal    |
| Hours      | GET     | `/hours/me`             | Tous (filtré selon rôle) |

---

## 8. 🎨 Design & UX

* Thème épuré (fond clair, accent bleu université)
* Dashboard par rôle :

  * RH/Admin : tableau de bord global + statistiques
  * Formateur principal : gestion des cours et étudiants
  * Formateur : saisie rapide des heures
  * Étudiant : vue simplifiée des cours et heures
* Notifications (Toast) pour actions réussies / erreurs

---

## 9. 📆 Planning indicatif

| Étape                          | Durée estimée | Responsable  |
| ------------------------------ | ------------- | ------------ |
| Conception & maquettes         |     xxxxxx    | Équipe Front |
| Architecture backend & modèles |     xxxxxx    | Équipe Back  |
| Développement frontend         |     xxxxxx    | Équipe Front |
| Développement backend          |     xxxxxx    | Équipe Back  |
| Tests & intégration            |     xxxxxx    | Formateur H5 |
| Présentation                   |     xxxxxx    | Full team    |


---

G1:
Francis
Karim
Thamas
Raoul
Warris
Nadège
Prince ***

G2:
Manu
Mathieu ***
Sergio
Alexio
Hermes
Fadel
```

#### Ajout — Arborescence proposée + étapes détaillées Front / Back (pour partage avec ton groupe 1)
(La partie suivante complète le fichier original ci‑dessus : arborescence, tâches détaillées, API contract, répartition et chronologie. Ne modifie pas la partie précédente.)

# Arborescence du projet (proposée)
- backend/
  - package.json
  - .env.example
  - src/
    - index.js                            # point d'entrée Express
    - app.js
    - config/
      - db.js
      - jwt.js
    - models/
      - User.model.js
      - Department.model.js
      - Course.model.js
      - HourEntry.model.js
    - controllers/
      - auth.controller.js
      - user.controller.js
      - department.controller.js
      - course.controller.js
      - hour.controller.js
    - routes/
      - auth.routes.js
      - user.routes.js
      - department.routes.js
      - course.routes.js
      - hour.routes.js
      - index.js
    - middlewares/
      - auth.middleware.js        # JWT verification
      - role.middleware.js        # role guard
      - error.middleware.js
      - validate.middleware.js    # validation with Joi/Zod
    - services/
      - auth.service.js
      - user.service.js
      - department.service.js
      - course.service.js
      - hour.service.js
    - utils/
      - logger.js
      - mailer.js (si reset pwd par mail)
    - validators/
      - auth.validator.js
      - user.validator.js
      - department.validator.js
      - course.validator.js
      - hour.validator.js
    - tests/
      - auth.test.js
      - user.test.js
- frontend/
  - package.json
  - vite.config.js
  - src/
    - main.js
    - router/
      - index.js
      - guards.js
    - api/
      - axios.js
      - auth.api.js
      - user.api.js
      - department.api.js
      - course.api.js
      - hour.api.js
    - stores/                    # stores JS (pas Pinia) — modules exportant state et fonctions
      - authStore.js
      - userStore.js
      - departmentStore.js
      - courseStore.js
      - hourStore.js
      - uiStore.js
    - composables/
      - useAuth.js
      - useFetch.js
      - useModal.js
    - components/
      - ui/
        - Button.vue
        - Input.vue
        - Modal.vue
        - Table.vue
        - Toast.vue
      - layout/
        - Navbar.vue
        - Sidebar.vue
        - Footer.vue
      - auth/
        - Login.vue
        - Register.vue (si utile)
        - ForgotPassword.vue
      - dashboard/
        - DashboardAdmin.vue
        - DashboardRH.vue
        - DashboardTeacher.vue
        - DashboardStudent.vue
      - users/
        - UserList.vue
        - UserForm.vue
        - UserProfile.vue
      - departments/
        - DepartmentList.vue
        - DepartmentForm.vue
      - courses/
        - CourseList.vue
        - CourseForm.vue
        - CourseStudents.vue
      - hours/
        - HourEntryForm.vue
        - HourEntryList.vue
      - students/
        - StudentView.vue
      - misc/
        - NotFound.vue
    - pages/
      - Home.vue
      - LoginPage.vue
      - UsersPage.vue
      - DepartmentsPage.vue
      - CoursesPage.vue
      - HoursPage.vue
      - StudentsPage.vue
    - assets/
    - styles/
      - tailwind.css
    - utils/
      - formatDate.js
      - validators.js
    - tests/
      - components/
      - e2e/ (optionnel)
- docs/
  - api.md
  - ERD.png
  - README.md

# Détails : Frontend — composants, stores, routes, données échangées
1. Principales routes Vue Router (exemples)
   - /login (public)
   - /dashboard (role-based)
     - /dashboard/admin
     - /dashboard/rh
     - /dashboard/teacher
     - /dashboard/student
   - /users (RH / Admin)
   - /users/:id (RH / Admin / user view)
   - /departments (Admin)
   - /departments/:id (Admin)
   - /courses (Formateur principal, Admin)
   - /courses/:id (détails, students)
   - /hours (Formateur, Principal)
   - /students (Formateur principal)
   - fallback: /404

2. Nombre approximatif de composants Vue
   - Composants UI réutilisables: ~8 (Button, Input, Modal, Table, Toast, Badge, Loader, Confirm)
   - Layout: ~3
   - Auth: 3
   - Dashboard (par rôle): 4
   - Users: 3
   - Departments: 2
   - Courses: 3 (list, form, students)
   - Hours: 2
   - Students/StudentView: 1
   - Total : ~30 composants (peut varier). Répartir entre membres.

3. Stores JS (pas Pinia)
   - authStore.js
     - export const state = reactive({ user: null, token: null, isAuthenticated: false })
     - export function login(credentials) -> calls auth.api.login -> stores token & user
     - export function logout()
     - export function loadFromStorage()
   - userStore.js
     - state: users array, currentUser
     - functions: fetchUsers(params), createUser(payload), updateUser(id,payload), toggleActive(id)
   - departmentStore.js
     - state: departments
     - functions: fetchDepartments(), createDepartment(), updateDepartment()
   - courseStore.js
     - state: courses
     - functions: fetchCourses(), createCourse(), updateCourse(), assignStudent(courseId, studentId)
   - hourStore.js
     - state: hourEntries
     - functions: fetchMyHours(), createHourEntry(), updateHourEntry(), deleteHourEntry()
   - uiStore.js
     - state: modals, toasts, loading flags

   - Remarque : chaque store exporte des fonctions async qui appellent les endpoints. Les composants importent ces fonctions et lisent l'état exporté.

4. Contrat API (requêtes / réponses — exemples)
   - Auth — POST /auth/login
     - Request body: { "email": "x", "password": "y" }
     - Success response: { "token": "<jwt>", "user": { _id, name, email, role, department, isActive } }
   - Auth — POST /auth/register (RH/Admin creates users)
     - Request body: { name, email, password, role, department? }
     - Response: created user
   - GET /users
     - Query: ?role=&department=&active=
     - Response: [ { _id, name, email, role, department, isActive } ]
   - PATCH /users/:id/role
     - Body: { role: "formateur" }
     - Response: updated user
   - GET /departments
     - Response: [ { _id, name, description, mainTeacher } ]
   - POST /departments
     - Body: { name, description, mainTeacher? }
     - Response: created department
   - POST /courses
     - Body: { title, code, description, departmentId, teacherId }
     - Response: created course
   - PATCH /courses/:id/students
     - Body: { action: "add"|"remove", studentId }
     - Response: updated course
   - POST /hours
     - Body: { courseId, date: ISOString, hours: Number, description? }
     - Response: created HourEntry
   - GET /hours/me
     - Query: ?from=&to=&courseId=
     - Response: [ { _id, course, teacher, date, hours, description } ]

   - Erreurs standardisées : { status: "error", message: "...", details?: {} }

5. Types/Validations (extraits)
   - User create/update:
     - name: required string
     - email: required email
     - password: required (min 6) on create
     - role: enum
     - department: ObjectId optional
   - HourEntry:
     - courseId: required ObjectId
     - date: required date
     - hours: required number > 0
     - description: optional string max 500

6. Comportement attendu côté Front lors d’un appel API non disponible
   - utiliser des mocks (fichier /src/api/mock/*.json) pour permettre dev front si back non prêt
   - chaque store doit exposer un mode mock vs real (via axios baseURL)

# Détails : Backend — routes, controllers, modèles, middlewares et tâches
1. Routes principales (cf arborescence)
   - auth.routes.js
     - POST /auth/login
     - POST /auth/register (restreint RH/Admin)
     - POST /auth/forgot-password (optionnel)
     - POST /auth/reset-password (optionnel)
   - user.routes.js
     - GET /users
     - GET /users/:id
     - POST /users
     - PATCH /users/:id
     - PATCH /users/:id/role
     - PATCH /users/:id/active
     - DELETE /users/:id
   - department.routes.js
     - GET /departments
     - POST /departments
     - GET /departments/:id
     - PATCH /departments/:id
     - DELETE /departments/:id
   - course.routes.js
     - GET /courses
     - POST /courses
     - GET /courses/:id
     - PATCH /courses/:id
     - PATCH /courses/:id/students
     - DELETE /courses/:id
   - hour.routes.js
     - POST /hours
     - GET /hours (admin view)
     - GET /hours/me
     - PATCH /hours/:id
     - DELETE /hours/:id

2. Middlewares à implémenter
   - auth.middleware.js : vérifie JWT, met user dans req.user
   - role.middleware.js : factory(roleArray) => vérifie req.user.role
   - validate.middleware.js : wrapper pour validators (Joi/Zod)
   - error.middleware.js : format error responses

3. Services & controllers
   - Séparer logique (services) et orchestration (controllers)
   - Services font les opérations Mongoose et validations business (ex: empêcher un formateur d’éditer une saisie d’un autre)

4. Modèles Mongoose
   - Implémenter schémas avec timestamps: true
   - Indexation:
     - User: index email unique
     - Course: index code unique, department ref
     - HourEntry: index teacher, course, date

5. Tests
   - tests unitaires pour services
   - tests d’intégration API (supertest)
   - fixtures pour les rôles (admin, rh, teacher, student)

# Répartition des tâches (G1 — suggestion)
Voici une répartition claire pour que chaque membre sache quoi faire. Tu peux ajuster selon préférences.

- Chef de projet / intégration (Prince) — coordination, merges, demo
  - Init repo, CI simple (lint, tests), déploiement dev (Heroku/Render/Cloud)
  - Gère la branche principale, PRs, vérifier intégrations front/back
  - Aide sur JWT, documentation API (docs/api.md)

- Backend lead (Francis)
  - Créer structure backend, connexion DB, modèles (User, Department, Course, HourEntry)
  - Implémenter auth (login), JWT, middleware auth
  - Tester endpoints /auth

- API & Services (Karim)
  - Implémenter user.routes + user.service + user.controller (CRUD users, role change, active toggle)
  - Tests unitaires pour users

- Department & Course (Thamas)
  - Implémenter department.routes + department.service/controller
  - Implémenter course.routes + course.service/controller (incl. assign teacher, students)
  - Validators pour department & course

- Hours & Business rules (Raoul)
  - Implémenter hour.routes + hour.service/controller (création, édition, suppression, fetch /me)
  - Business check : formateur peut seulement saisir pour ses cours
  - Tests integration pour hours

- Frontend lead (Warris)
  - Init frontend (Vite), Tailwind, router, axios base
  - Implémenter authStore.js, Login page, router guards
  - Dashboard layouts (skeletons)

- Front components & pages (Nadège)
  - UsersPage, UserList, UserForm, modals
  - DepartmentsPage, DepartmentList, DepartmentForm
  - Intégration avec userStore & departmentStore

- Courses & Hours front (équipe pair: Prince + Raoul)
  - CourseList, CourseForm, CourseStudents
  - HourEntryForm, HourEntryList
  - Intégration avec courseStore & hourStore

Remarques :
- Chaque backend dev documente ses endpoints dans docs/api.md (exemple request/response).
- Chaque frontend dev ajoute tests unitaires simples (ou snapshots) pour composants critiques.

# Chronologie recommandée (alternance front/back)
But : travailler en itérations courtes permettant test et intégration continue (ex : sprints de 4–6 jours). À chaque itération, on alterne pour que front et back puissent s’intégrer.

Sprint 0 — Préparations (1 jour)
- Backend: init repo, .env.example, connexion MongoDB, models (squelettes)
- Frontend: init repo Vite, Tailwind, router, axios config
- Tous: conventions de code, PR process, branch naming

Sprint 1 — Auth (2–3 jours)
- Backend: implémenter POST /auth/login, POST /auth/register (restreint), JWT, middleware
- Frontend: Login.vue, authStore.js, router guard — test end-to-end (connexion)
- Livrable : utilisateur peut se connecter et token est stocké

Sprint 2 — Users CRUD minimal + UI (3 jours)
- Backend: GET /users, POST /users, PATCH /users/:id/role, PATCH /users/:id/active
- Frontend: UsersPage, UserList, UserForm modal, appels userStore -> API
- Synchronisation : backend fournit mock data si front ready; front uses real API when available

Sprint 3 — Departments & Courses (4 jours)
- Backend: departments endpoints, courses endpoints (create, list, assign teacher)
- Frontend: DepartmentsPage, DepartmentForm, CoursesPage, CourseForm
- Règles : affectation formateur principal

Sprint 4 — Students & Course assignment (3 jours)
- Backend: PATCH /courses/:id/students
- Frontend: CourseStudents.vue (affecter/désaffecter), StudentView
- Tests : vérif rôle formateur_principal

Sprint 5 — Saisie d’heures (3 jours)
- Backend: POST /hours, GET /hours/me, PATCH/DELETE
- Frontend: HourEntryForm, HourEntryList, historisation
- Business logic testée: formateur only for his course

Sprint 6 — Dashboard & exports (2–3 jours)
- Frontend: Dashboard par rôle, charts simples (nbr heures, nbr cours)
- Backend: endpoints statistiques (optional)
- Option: export PDF (étudiant)

Sprint 7 — Tests, corrections, intégration finale (2–4 jours)
- Tests d’intégration, correction bugs, mise en place README et how-to run

# Checklist technique (pratique)
- Backend
  - [ ] Linter (ESLint), Prettier
  - [ ] Tests unitaires (jest/mocha)
  - [ ] Middleware JWT + role guard
  - [ ] Validation (Joi/Zod)
  - [ ] Documentation des endpoints (docs/api.md ou swagger)
- Frontend
  - [ ] Linter (ESLint), Prettier
  - [ ] Tailwind setup
  - [ ] Axios avec interceptors (pour attacher token et traiter 401)
  - [ ] Router guards basés sur authStore
  - [ ] Stores JS exportant state et fonctions (pas Pinia)
  - [ ] Pages responsives, composants réutilisables

# Exemples concrets (mini-contrats pour développeurs)
- Exemple : création d’un utilisateur (front -> back)
  - Front : POST /auth/register (body JSON)
    - { name, email, password, role, departmentId? }
  - Back : validate input -> create user -> return { user }
  - Front : après création, rafraîchir userStore.fetchUsers()

- Exemple : formateur saisit des heures
  - Front: POST /hours
    - body: { courseId: "abc123", date: "2025-10-22", hours: 2.5, description: "TD" }
    - headers: Authorization: Bearer <token>
  - Back: auth.middleware vérifie token, role middleware vérifie que teacher is owner of course -> save HourEntry
  - Back response: created hour entry
  - Front: push to hourStore.hourEntries et afficher toast succès

# Bonnes pratiques et conseils d'organisation
- Faire des PRs petites et ciblées (une fonctionnalité = une PR)
- Chaque endpoint doit être documenté (exemples request/response) dans docs/api.md
- Utiliser Postman collection partagée pour tests manuels
- Mettre en place des fixtures pour tests (users avec rôles)
- Réunions courtes journalières (10–15 min) pour synchroniser blocages
- Chaque dev rédige une brève section "how to run my part" dans README

---

Si vous voulez, je peux :
- Générer automatiquement la Postman collection de base (JSON) pour les endpoints listés.
- Fournir les fichiers boilerplate (exemples de modèles Mongoose, controllers minimalistes, et templates de components Vue) pour accélérer le démarrage.
- Créer une checklist prête à cocher en Markdown pour vos sprints.

Veux-tu que je génère maintenant les fichiers boilerplate (backend models/controllers + frontend stores et composants skeleton) pour que l'équipe commence à coder ? Si oui, précises si tu veux que je crée une branche ou que je prépare des PRs (je peux te fournir le contenu prêt à copier/coller).
```
"# Fin_node_groupe" 
