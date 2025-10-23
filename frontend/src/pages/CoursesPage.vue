<script setup>
import { ref, onMounted } from 'vue'
import { useCourse } from '../composables/useCourse'





const { getAll, remove } = useCourse()
const courses = ref([])

const fetchCourses = async () => {
  courses.value = await getAll()
}
const deleteCourse = async (id) => {
  if (confirm('Supprimer ce cours ?')) {
    await remove(id)
    fetchCourses()
  }
}
onMounted(fetchCourses)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Cours</h1>
    <router-link to="/courses/new" class="bg-blue-600 text-white px-3 py-2 rounded">+ Nouveau cours</router-link>

    <table class="w-full border mt-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Titre</th>
          <th class="p-2 border">Département</th>
          <th class="p-2 border">Formateur principal</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in courses" :key="c._id">
          <td class="border p-2">{{ c.title }}</td>
          <td class="border p-2">{{ c.department?.name }}</td>
          <td class="border p-2">{{ c.mainTeacher?.name || 'Non assigné' }}</td>
          <td class="border p-2">
            <button @click="deleteCourse(c._id)" class="text-red-600">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
