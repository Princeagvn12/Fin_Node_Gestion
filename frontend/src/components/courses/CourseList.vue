<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// Mock courses data - replace with API call if available
const MOCK_COURSES = [
  { _id: 'c1', title: 'Math 101', teacher: 'Alice L', department: 'Mathématiques' },
  { _id: 'c2', title: 'Intro to Programming', teacher: 'Bob M', department: 'Informatique' },
  { _id: 'c3', title: 'Physics I', teacher: 'Jean D', department: 'Physique' }
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

const showEditForm = ref(false);
const selectedCourse = ref(null);

const handleDelete = async (id) => {
  if (!confirm('Voulez-vous supprimer ce cours ?')) return;
  // TODO: call API to delete
  courses.value = courses.value.filter(c => c._id !== id);
};

const handleEdit = (course) => {
  selectedCourse.value = { ...course };
  showEditForm.value = true;
};

const handleUpdate = () => {
  const index = courses.value.findIndex(c => c._id === selectedCourse.value._id);
  if (index !== -1) {
    // TODO: call API to update
    courses.value[index] = { ...selectedCourse.value };
  }
  showEditForm.value = false;
};
</script>

<template>
  <div class="max-w-2xl  mx-auto mt-20 p-10 shadow sm:rounded-lg">
    <div class="flex justify-between items-center mb-4">
  <h1 class="text-2xl font-bold">Liste des cours</h1>
  <RouterLink :to="{ name: 'coursesform' }" class="bg-green-500 text-white px-4 py-2 rounded">+ Nouveau cours</RouterLink>
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
             <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Département</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="c in filtered" :key="c._id">
            <td class="px-4 py-3">{{ c.title }}</td>
            <td class="px-4 py-3">{{ c.teacher }}</td>
            <td class="px-4 py-3">{{ c.description }}</td>
            <td class="px-4 py-3">{{ c.department }}</td>
            <td class="px-4 py-3">
              <button @click="handleEdit(c)" class="text-yellow-600 mr-3"><i class="ri-edit-2-line"></i></button>
              <button @click="handleDelete(c._id)" class="text-red-600"><i class="ri-delete-bin-6-line"></i></button>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="4" class="px-4 py-6 text-center text-gray-500">Aucun cours trouvé.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulaire de modification -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Modifier le cours</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Titre</label>
            <input v-model="selectedCourse.title" type="text" class="mt-1 block w-full border rounded-md px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Formateur</label>
            <input v-model="selectedCourse.teacher" type="text" class="mt-1 block w-full border rounded-md px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="selectedCourse.description" class="mt-1 block w-full border rounded-md px-3 py-2"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Département</label>
            <input v-model="selectedCourse.department" type="text" class="mt-1 block w-full border rounded-md px-3 py-2">
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button @click="showEditForm = false" class="px-4 py-2 border rounded-md text-gray-600">
              Annuler
            </button>
            <button @click="handleUpdate" class="px-4 py-2 bg-blue-500 text-white rounded-md">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ri-user-line { line-height: 1; }
</style>
