<template>
  <!-- Formulaire principal, boîte style carte -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-4">
    <h2 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
      Saisir les heures
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-300 text-sm">
      Ajouter ou modifier une entrée d'heure pour un cours.
    </p>
    <!-- FORMULAIRES -->
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <!-- Sélection du cours -->
      <div>
        <label class="block mb-1 font-semibold text-blue-700 dark:text-blue-300" for="course">Cours</label>
        <select 
          id="course"
          v-model="form.course"
          required
          class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200"
        >
          <option value="" disabled>-- Sélectionner un cours --</option>
          <option v-for="cours in courses" :key="cours._id" :value="cours._id">
            {{ cours.title }}
          </option>
        </select>
      </div>

      <!-- Date du cours -->
      <div>
        <label class="block mb-1 font-semibold text-blue-700 dark:text-blue-300" for="date">Date</label>
        <input
          id="date"
          type="date"
          required
          v-model="form.date"
          class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200"
        />
      </div>

      <!-- Heures de début/fin -->
      <div class="flex flex-col gap-2 md:flex-row md:gap-4">
        <div class="flex-1">
          <label class="block mb-1 font-semibold text-blue-700 dark:text-blue-300" for="start">Heure de début</label>
          <input
            id="start"
            type="time"
            required
            v-model="form.startTime"
            class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200"
          />
        </div>
        <div class="flex-1">
          <label class="block mb-1 font-semibold text-blue-700 dark:text-blue-300" for="end">Heure de fin</label>
          <input
            id="end"
            type="time"
            required
            v-model="form.endTime"
            class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block mb-1 font-semibold text-blue-700 dark:text-blue-300" for="desc">Description</label>
        <textarea
          id="desc"
          v-model="form.description"
          rows="2"
          placeholder="Décrivez votre activité..."
          class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200"
        ></textarea>
      </div>

      <!-- Bouton soumission -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          {{ editMode ? "Modifier l'entrée" : "Ajouter l'entrée" }}
        </button>
      </div>
      <!-- Affichage d'erreur ou de success -->
      <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</div>
      <div v-if="successMsg" class="text-green-600 dark:text-green-400 text-sm">{{ successMsg }}</div>
    </form>
  </div>
</template>

<script setup>
// Import nécessaire
import { ref, reactive, watch, onMounted } from "vue";
import { useHours } from "../../composables/hour.js"; // CHEMIN ADAPTÉ À TON ARBORESCENCE

// Props reçus du parent
const props = defineProps({
  courses: { type: Array, required: true },    // Liste des cours (pour le select)
  entryToEdit: { type: Object, default: null } // Pour édition, sinon null
});

// Évènements émis au parent
const emit = defineEmits(["saved"]);

// Etat du formulaire
const form = reactive({
  course: "",
  date: "",
  startTime: "",
  endTime: "",
  description: ""
});

// Mode édition ?
const editMode = ref(false);

// Etat messages
const error = ref("");
const successMsg = ref("");

// Initialisation pour édition
watch(() => props.entryToEdit, (entry) => {
  if (entry) {
    form.course = entry.course || "";
    form.date = entry.date ? entry.date.substring(0,10) : "";
    form.startTime = entry.startTime || "";
    form.endTime = entry.endTime || "";
    form.description = entry.description || "";
    editMode.value = true;
  } else {
    // Réinitialiser si non en édition
    form.course = "";
    form.date = "";
    form.startTime = "";
    form.endTime = "";
    form.description = "";
    editMode.value = false;
  }
});

// Appels API via composable
const { addHour, updateHour } = useHours();

// Calcul automatique durée (en heures décimales, step 0.25)
function calculateDuration(start, end) {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const dStart = sh * 60 + sm;
  const dEnd = eh * 60 + em;
  const minutes = dEnd - dStart;
  return Math.round((minutes / 60) * 4) / 4; // multiple de 0.25
}

// Soumission du formulaire
async function onSubmit() {
  error.value = "";
  successMsg.value = "";

  // Validation simple
  if (calculateDuration(form.startTime, form.endTime) <= 0) {
    error.value = "L'heure de fin doit être après l'heure de début.";
    return;
  }

  // Création du payload d'envoi
  const payload = {
    course: form.course,
    date: form.date,
    hours: calculateDuration(form.startTime, form.endTime),
    description: form.description,
    // startTime/endTime are kept for UI but not persisted in backend schema
  };

  try {
    if (editMode.value && props.entryToEdit && props.entryToEdit._id) {
      await updateHour(props.entryToEdit._id, payload);
      successMsg.value = "Entrée modifiée avec succès !";
    } else {
      await addHour(payload);
      successMsg.value = "Entrée ajoutée avec succès !";
      // Reset form
      form.course = "";
      form.date = "";
      form.startTime = "";
      form.endTime = "";
      form.description = "";
    }
    emit("saved"); // Ordonne au parent le rafraîchissement
  } catch (err) {
    error.value = err.message || "Erreur lors de la sauvegarde.";
  }
}
</script>

<!--
Explications :
- Le parent (HoursViews.vue) passe la liste des cours en prop "courses" et l'entrée à éditer (entryToEdit) si édition.
- À la soumission, le formulaire valide le calcul des heures, crée l'objet et utilise le composable pour l'appel backend.
- Emit "saved" pour que le parent recharge la liste.
- Responsive + couleur bleu + mode sombre via Tailwind.
-->
