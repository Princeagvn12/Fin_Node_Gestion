<script setup>
import { ref, onMounted, computed } from "vue";
import { useDepartments } from "../../composables/department";

const {
  departments,
  loading,
  error,
  fetchDepartments,
  removeDepartment,
} = useDepartments();

const query = ref("");

const filtered = computed(() => {
  if (!query.value) return departments.value;
  const q = query.value.toLowerCase();
  return departments.value.filter(
    (d) =>
      (d.name || "").toLowerCase().includes(q) ||
      (d.description || "").toLowerCase().includes(q)
  );
});

onMounted(() => fetchDepartments());

const handleDelete = async (deptId) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce département ?")) return;
  try {
    await removeDepartment(deptId);
  } catch (err) {
    console.error("Erreur lors de la suppression:", err);
    alert(err?.response?.data?.message || err.message || "Erreur lors de la suppression");
  }
};
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des départements</h1>
      <RouterLink
        to="/department/departform"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <span class="mr-2">+</span> Ajouter un département
      </RouterLink>
    </div>

    <div class="flex gap-6 m-4">
      <div>
        <input
          v-model="query"
          placeholder="Recherche par nom ou description"
          class="w-150 h-10 border border-gray-200 rounded-lg outline-none px-3"
          type="search"
          name="recherche"
          id="recherche"
        />
      </div>
      <RouterLink
        to="/department/departform"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <span class="mr-2">+</span> Ajouter un département
      </RouterLink>
    </div>

    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nom du Département
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Formateur Principal
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="dept in filtered" :key="dept._id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap font-medium">{{ dept.name }}</td>
            <td class="px-6 py-4">{{ dept.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <RouterLink
                :to="'/departments/edit/' + dept._id"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Modifier
              </RouterLink>
              <button
                @click="handleDelete(dept._id)"
                class="text-red-600 hover:text-red-900"
              >
                Supprimer
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
