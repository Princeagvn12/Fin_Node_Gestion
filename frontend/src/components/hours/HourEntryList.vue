<template>
  <!-- Historique des entrées = tableau -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <h2 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
      Historique des entrées
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-300 text-sm">
      Visualisez et gérez toutes vos entrées d'heures.
    </p>

    <!-- Si aucune entrée -->
    <div v-if="!entries.length" class="text-gray-400 dark:text-gray-500 py-4 text-center">
      Aucune entrée enregistrée pour le moment.
    </div>

    <!-- Tableau des entrées -->
    <div v-else class="overflow-auto">
      <table class="min-w-full text-sm md:text-base rounded-lg">
        <thead>
          <tr class="bg-blue-100 dark:bg-blue-950">
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Cours</th>
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Date</th>
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Durée</th>
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Description</th>
            <th class="p-2 text-center text-blue-800 dark:text-blue-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in entries"
            :key="entry._id"
            class="border-b border-blue-100 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-gray-900 transition"
          >
            <!-- Nom du cours, badge -->
            <td class="p-2 font-semibold">
              <span class="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {{ findCourse(entry.course) }}
              </span>
            </td>
            <td class="p-2 font-mono">
              {{ formatDate(entry.date) }}
            </td>
            <td class="p-2 font-mono">
              {{ durationText(entry.hours) }}
            </td>
            <td class="p-2 max-w-xs truncate" :title="entry.description">
              {{ entry.description || '-' }}
            </td>
            <td class="p-2 text-center flex gap-1 justify-center">
              <!-- Action modifier -->
              <button
                class="px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white transition dark:bg-blue-400 dark:hover:bg-blue-700"
                @click="$emit('edit', entry)"
                title="Modifier"
              >✏️</button>
              <!-- Action supprimer -->
              <button
                class="px-2 py-1 rounded bg-red-600 hover:bg-red-800 text-white transition dark:bg-red-800 dark:hover:bg-red-900"
                @click="$emit('delete', entry._id)"
                title="Supprimer"
              >🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Props : entries = liste d'entrées à afficher, courses = liste des cours (pour label)
const props = defineProps({
  entries: { type: Array, required: true },
  courses: { type: Array, required: true }
});

// Utilitaire pour formatage de la date
import { formatDate } from '../../utils/formatDate.js';

// Retrouver le nom du cours à partir de l'id
function findCourse(courseId) {
  // courseId may be populated object or id string
  const id = courseId && courseId._id ? String(courseId._id) : String(courseId);
  const c = props.courses.find(cours => String(cours._id) === id);
  return c ? c.title : (courseId && courseId.title ? courseId.title : 'inconnu');
}

// Afficher la durée en style "Xh Ymin" à partir d'un nombre décimal (ex: 3.5 → "3h 30min")
function durationText(hours) {
  if (!hours) return "-";
  const h = Math.floor(hours);
  const min = Math.round((hours - h) * 60);
  return `${h}h${min ? ` ${min}min` : ""}`;
}

// Events émis : 'edit' pour passer une entrée à modifier, 'delete' pour notifier la suppression
</script>

<!--
Explications :
- Le tableau affiche toutes les entrées passées en prop "entries"
- La colonne cours utilise "courses" pour afficher le label du cours sous forme de badge
- Actions "modifier" et "supprimer" notifient le parent par le bon event
- Responsive, bleu, dark mode automatique
-->
