<script setup>
import {ref, onMounted,computed } from 'vue';
// import { useDepartments } from '../../composables/department';
// import { RouterLink } from 'vue-router';

// const { departments, loading, error, fetchDepartments, removeDepartment } = useDepartments();

onMounted(() => {
  // fetchDepartments();
});

//filter les départements
const department = ref([]);
const query = ref('')

const departments = computed(() => {
  if (!query.value) return department.value;
  return department.value.filter(c =>
    (c.name && c.name.toLowerCase().includes(query.value.toLowerCase()))||  (c.formateur_principale && c.formateur_principale.toLowerCase().includes(query.value.toLowerCase()))

  );
});

const handleDelete = async (deptId) => {
  // if (confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) {
  //   try {
  //     await removeDepartment(deptId);
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression:', error);
  //   }
  // }
};
</script>

<template>
  <div class=" max-w-4xl mx-auto mt-20 shadow sm:rounded-lg p-10">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des départements</h1>
      <RouterLink 
        to="/admin/department/departform"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <span class="mr-2">+</span> Ajouter un département
      </RouterLink>
    </div>

      <div class="mb-4 flex gap-2">
          <input v-model="query" placeholder="Rechercher par name, formateur_principale" class="flex-1 border rounded px-3 py-2" />
        </div>


    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du Département</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formateur Principal</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="dept in departments" :key="dept._id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap font-medium">{{ dept.name }}</td>
            <td class="px-6 py-4">{{ dept.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <RouterLink 
                :to="'/departments/edit/' + dept._id"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
               <i class="ri-edit-2-line"></i>
              </RouterLink>
              <button 
                @click="handleDelete(dept._id)"
                class="text-red-600 hover:text-red-900"
              >
               <i class="ri-delete-bin-6-line"></i> 
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>