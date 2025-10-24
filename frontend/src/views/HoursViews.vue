<script setup>


</script>


<template>
  <section class="py-6 px-2 sm:px-6 max-w-2xl mx-auto">
    <div class="mb-6">
      <HourEntryForm
        :courses="courses"
        :entryToEdit="hourToEdit"
        @saved="handleSuccess"
      />
    </div>

    <div>
      <HourEntryList
        :entries="hours"
        :courses="courses"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HourEntryForm from "@/components/hours/HourEntryForm.vue";
import HourEntryList from "@/components/hours/HourEntryList.vue";
import { useHours } from "@/composables/hour.js";

// À adapter : l’ID du cours à gérer (peut venir de route, prop, etc)
const courseId = "remplace-par-l-id-du-cours-actuel";

const hours = ref([]);
const editMode = ref(false);
const hourToEdit = ref(null);
const courses = ref([]);

const { fetchMyHours, fetchCourses, deleteHour } = useHours();

// Charger la liste des heures en début et après chaque action
async function refresh() {
  hours.value = await fetchMyHours();
  editMode.value = false;
  hourToEdit.value = null;
}

async function loadCourses() {
  courses.value = await fetchCourses();
}

onMounted(async () => { await Promise.all([refresh(), loadCourses()]); });

// Ajout ou modification réussie
function handleSuccess() {
  refresh();
}

// Demander l’édition d’une saisie (form passe en mode edit)
function handleEdit(hour) {
  editMode.value = true;
  hourToEdit.value = hour;
}

// Suppression
async function handleDelete(id) {
  if (!window.confirm("Confirmer la suppression ?")) return;
  await deleteHour(id);
  refresh();
}
</script>

<style scoped>
/* Géré par Tailwind */
</style>
