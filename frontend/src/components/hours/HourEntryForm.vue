<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col gap-4 w-full max-w-md mx-auto
      sm:max-w-lg
      md:max-w-xl
      transition
    "
  >
    <div>
      <label for="date" class="block mb-1 text-blue-700 dark:text-blue-300 font-semibold">Date du cours*</label>
      <input
        v-model="hour.date"
        id="date"
        type="date"
        required
        class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200 focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label for="hours" class="block mb-1 text-blue-700 dark:text-blue-300 font-semibold">Nombre d'heures *</label>
      <input
        v-model.number="hour.hours"
        id="hours"
        min="0.25"
        step="0.25"
        type="number"
        required
        placeholder="Ex : 1.5"
        class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200 focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label for="description" class="block mb-1 text-blue-700 dark:text-blue-300 font-semibold">Description</label>
      <textarea
        v-model="hour.description"
        id="description"
        rows="2"
        placeholder="Détail du contenu ou remarque (optionnel)"
        class="w-full rounded border border-blue-300 dark:border-blue-700 p-2 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-blue-200 focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>
    <div>
      <button
        :disabled="loading"
        type="submit"
        class="w-full py-2 px-4 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition 
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-700
          disabled:opacity-50"
      >
        {{ editMode ? "Modifier la saisie" : "Ajouter une saisie" }}
      </button>
    </div>
    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
  </form>
</template>

<script setup>
import { reactive, toRefs, watch, ref } from "vue";

// Props
const props = defineProps({
  courseId: { type: String, required: true },
  initialHour: { type: Object, default: null }, // Pour édition
  editMode: { type: Boolean, default: false }
});

// Événements émis
const emits = defineEmits(["success", "cancel"]);

// Form state
const hour = reactive({
  date: props.initialHour ? props.initialHour.date?.substring(0,10) : "",
  hours: props.initialHour ? props.initialHour.hours : "",
  description: props.initialHour ? props.initialHour.description : ""
});

const loading = ref(false);
const error = ref("");

// Watch pour synchroniser à l’édition
watch(() => props.initialHour, (newVal) => {
  if (newVal) {
    hour.date = newVal.date?.substring(0,10);
    hour.hours = newVal.hours;
    hour.description = newVal.description;
  }
});

// Simulation d’appel API via composable
import { useHours } from "@/composables/hours.js"; // À adapter selon ton arborescence
const { addHour, updateHour } = useHours();

async function handleSubmit() {
  error.value = "";
  loading.value = true;
  try {
    if (props.editMode && props.initialHour?._id) {
      // Modification
      await updateHour(props.initialHour._id, { ...hour, course: props.courseId });
    } else {
      // Création
      await addHour({ ...hour, course: props.courseId });
      // Vide le formulaire à la création
      hour.date = "";
      hour.hours = "";
      hour.description = "";
    }
    emits("success"); // Notifie le parent pour refresh ou fermer le modal
  } catch (err) {
    error.value = err?.message || "Erreur lors de la sauvegarde";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>

</style>
