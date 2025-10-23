<!-- <script setup>
import { ref, onMounted } from 'vue'
import { useDepartment } from '../../composables/useDepartement'

const { getAll, remove } = useDepartment()
const departments = ref([])

const fetchDepartments = async () => {
  departments.value = await getAll()
}
const deleteDept = async (id) => {
  if (confirm('Supprimer ce département ?')) {
    await remove(id)
    fetchDepartments()
  }
}

onMounted(fetchDepartments)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Départements</h1>
    <router-link to="/departments/new" class="bg-blue-600 text-white px-3 py-2 rounded">+ Nouveau</router-link>

    <table class="w-full border mt-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Nom</th>
          <th class="p-2 border">Description</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in departments" :key="d._id">
          <td class="border p-2">{{ d.name }}</td>
          <td class="border p-2">{{ d.description }}</td>
          <td class="border p-2">
            <button @click="deleteDept(d._id)" class="text-red-600">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> -->


<script setup>
import { ref, onMounted } from 'vue'
import { useDepartment } from '../../composables/useDepartement'

const { getAll:getDepts } = useDepartment()
const departments = ref([])

const fetchDepartments = async () => {
  departments.value = await getDepts()
}
const deleteDept = async (id) => {
  if (confirm('Supprimer ce département ?')) {
    await remove(id)
    fetchDepartments()
  }
}

onMounted(fetchDepartments)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Départements</h1>
    <router-link to="/departments/new" class="bg-blue-600 text-white px-3 py-2 rounded">+ Nouveau</router-link>

    <table class="w-full border mt-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Nom</th>
          <th class="p-2 border">Description</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in departments" :key="d._id">
          <td class="border p-2">{{ d.name }}</td>
          <td class="border p-2">{{ d.description }}</td>
          <td class="border p-2">
            <button @click="deleteDept(d._id)" class="text-red-600">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

