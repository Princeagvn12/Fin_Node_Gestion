<template>
  <div class="w-full">
    <h2 class="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
      Mes heures 
    </h2>
    <!-- Message si aucun résultat -->
    <div v-if="!hours?.length" class="text-gray-500 dark:text-gray-300 py-4 text-center">
      Aucune heure saisie pour ce cours.
    </div>
    <!-- Liste des heures -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-sm md:text-base bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead>
          <tr class="bg-blue-100 dark:bg-blue-950">
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Date</th>
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Durée </th>
            <th class="p-2 text-left text-blue-800 dark:text-blue-200">Description</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="hour in hours"
            :key="hour._id"
            class="border-b border-blue-100 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-gray-900 transition"
          >
            <td class="p-2 font-mono">
              {{ formatDate(hour.date) }}
            </td>
            <td class="p-2">
              {{ hour.hours }}
            </td>
            <td class="p-2 max-w-xs truncate" :title="hour.description">
              {{ hour.description || '-' }}
            </td>
            <td class="p-2 flex gap-2">
              <button
                @click="$emit('edit', hour)"
                class="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition dark:bg-blue-400 dark:hover:bg-blue-600"
                title="Modifier"
              >
                ✏️
              </button>
              <button
                @click="$emit('delete', hour._id)"
                class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition dark:bg-red-700 dark:hover:bg-red-900"
                title="Supprimer"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Props : reçoit la liste d’heures à afficher
const props = defineProps({
  hours: Array // [{ _id, date, hours, description }]
});

// Utilitaire date (automatiquement utilisé)
import { formatDate } from "@/utils/formatDate.js";
</script>

<style scoped>

</style>

