<script setup>
import { ref, onMounted } from 'vue';
import { useDepartments } from '../../composables/department';
import { RouterLink } from 'vue-router';

const totalDepartments = ref(0);
const newDepartments = ref(0);
const { departments, fetchDepartments } = useDepartments();

onMounted(async () => {
  await fetchDepartments();
  totalDepartments.value = departments.value.length;
  // example: new departments in last month - placeholder logic
  newDepartments.value = Math.max(0, Math.floor(totalDepartments.value * 0.05));
});
</script>

<template>
  <RouterLink
    to="/departments"
    class="block transition-transform hover:scale-[1.02]"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl
             w-full sm:w-72 md:w-80 p-5 md:p-6 transition-shadow duration-300 h-full"
    >
      <!-- Titre + Icône -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200">
          Départements Totaux
        </h2>
        <div
          class="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center"
        >
          <i class="ri-database-line text-xl md:text-2xl text-blue-600 dark:text-blue-400"></i>
        </div>
      </div>

      <!-- Contenu -->
      <div class="space-y-2">
        <p class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {{ totalDepartments }}
        </p>

        <div class="flex items-center text-sm">
          <span class="flex items-center text-green-600 dark:text-green-400">
            <i class="ri-arrow-up-line mr-1"></i>
            +{{ newDepartments }}
          </span>
          <span class="ml-2 text-gray-500 dark:text-gray-400">
            nouveau département
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>


<style scoped>
.ri-database-line, .ri-arrow-up-line {
  line-height: 1;
}
</style>