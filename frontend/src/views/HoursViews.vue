<template>
  <section class="py-6 px-2 sm:px-6 max-w-2xl mx-auto">
    <div class="mb-6">
      <HourEntryForm
        :courseId="courseId"
        :editMode="editMode"
        :initialHour="hourToEdit"
        @success="handleSuccess"
      />
    </div>

    <div>
      <HourEntryList
        :hours="hours"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HourEntryForm from "./HourEntryForm.vue";
import HourEntryList from "./HourEntryList.vue";
import { useHours } from "@/composables/hours.js";

// À adapter : l’ID du cours à gérer (peut venir de route, prop, etc)
const courseId = "remplace-par-l-id-du-cours-actuel";

const hours = ref([]);
const editMode = ref(false);
const hourToEdit = ref(null);

const { fetchMyHours, deleteHour } = useHours();

// Charger la liste des heures en début et après chaque action
async function refresh() {
  hours.value = await fetchMyHours();
  editMode.value = false;
  hourToEdit.value = null;
}

onMounted(refresh);

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
