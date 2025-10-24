<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// Mock courses data - replace with API call if available
const MOCK_COURSES = [
  { title: 'Math 101', teacher: 'Alice L', department: 'Mathématiques' },
  { title: 'Intro to Programming', teacher: 'Bob M', department: 'Informatique' },
  {title: 'Physics I', teacher: 'Jean D', department: 'Physique' }
];

const courses = ref([]);
const loading = ref(false);
const error = ref(null);
const query = ref('');

const fetchCourses = async () => {
  loading.value = true;
  error.value = null;
  try {
    // TODO: replace with API call (axios.get('/courses'))
    courses.value = MOCK_COURSES;
  } catch (err) {
    error.value = 'Erreur lors du chargement des cours';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCourses);

const filtered = computed(() => {
  if (!query.value) return courses.value;
  return courses.value.filter(c =>
    c.title.toLowerCase().includes(query.value.toLowerCase()) ||
    (c.teacher && c.teacher.toLowerCase().includes(query.value.toLowerCase())) ||
    (c.department && c.department.toLowerCase().includes(query.value.toLowerCase()))
  );
});

const handleDelete = async (id) => {
  if (!confirm('Voulez-vous supprimer ce cours ?')) return;
  // TODO: call API to delete
  courses.value = courses.value.filter(c => c._id !== id);
};
</script>

<template>
  <div class="max-w-2xl  mx-auto mt-20 p-10 shadow sm:rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Liste des cours</h1>
      <RouterLink to="/courses/new" class="bg-green-500 text-white px-4 py-2 rounded">+ Nouveau cours</RouterLink>
    </div>

    <div class="mb-4 flex gap-2">
      <input v-model="query" placeholder="Rechercher par titre, formateur, département" class="flex-1 border rounded px-3 py-2" />
    </div>

    <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded">{{ error }}</div>
    <div v-if="loading" class="flex justify-center py-8">Chargement...</div>

    <div v-else class="bg-white  rounded p-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Titre</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Formateur</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Département</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="c in filtered" :key="c._id">
            <td class="px-4 py-3">{{ c.title }}</td>
            <td class="px-4 py-3">{{ c.teacher }}</td>
            <td class="px-4 py-3">{{ c.department }}</td>
            <td class="px-4 py-3">
              <RouterLink :to="`/courses/edit/${c._id}`" class="text-yellow-600 mr-3"><i class="ri-edit-2-line"></i></RouterLink>
              <button @click="handleDelete(c._id)" class="text-red-600 "><i class="ri-delete-bin-6-line"></i></button>
              
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="4" class="px-4 py-6 text-center text-gray-500">Aucun cours trouvé.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ri-user-line { line-height: 1; }
</style>
