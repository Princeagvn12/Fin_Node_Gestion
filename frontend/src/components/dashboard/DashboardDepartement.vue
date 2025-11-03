<template>
  <section class="p-6 bg-gray-50">
    <header class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0"><i class="fas fa-university text-blue-600 mr-2"></i> Gestion des Départements</h1>
      <div class="flex gap-4">
        <button @click="openModal" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          <i class="fas fa-plus"></i>  Créer un Département
        </button>
        <input v-model="search" type="search" placeholder="Rechercher un département..."
               class="px-4 py-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
    </header>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded shadow">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-6 py-3 text-left"><i class="fas fa-tag mr-2 text-gray-500"></i> Nom</th>
            <th class="px-6 py-3 text-left"><i class="fas fa-chalkboard-teacher mr-2 text-gray-500"></i> Formateur</th>
            <th class="px-6 py-3 text-left"><i class="fas fa-book mr-2 text-gray-500"></i> Cours</th>
            <th class="px-6 py-3 text-left"><i class="fas fa-circle mr-2 text-gray-500"></i> Statut</th>
            <th class="px-6 py-3 text-left"><i class="fas fa-tools mr-2 text-gray-500"></i> Actions</th>
          </tr>()
        </thead>
        <tbody>
          <tr v-for="dept in filteredDepartements" :key="dept.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ dept.name }}</td>
            <td class="px-6 py-4">{{ dept.principalInstructor?.name || '—' }}</td>
            <td class="px-6 py-4">{{ dept.numberOfCourses }}</td>
            <td class="px-6 py-4">
              <span :class="badgeClass(dept.statut)" class="inline-block px-2 py-1 text-sm font-semibold rounded">
                {{ dept.principalInstructor?.statut }}
              </span>
            </td>
            <td class="px-6 py-4 flex gap-2">
              <button @click="editDept(dept)" class=" hover:text-blue-600"><i class="fas fa-edit"></i></button>
              <button @click="deleteDept(dept._id)" class="text-red-400 hover:text-red-600"> <i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="mt-6 flex justify-center items-center gap-4 text-gray-600">
      <button @click="prevPage" class="px-3 py-1 border rounded hover:bg-gray-100">
        <i class="fas fa-chevron-left"></i>
      </button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" class="px-3 py-1 border rounded hover:bg-gray-100">
        <i class="fas fa-chevron-right"></i>
      </button>
    </footer>
  </section>
  <!-- MODALE DE CRÉATION -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fade-in">
    <h2 class="text-xl font-bold mb-4">Créer un Département</h2>

    <form @submit.prevent="submitDepartement" class="space-y-4">
      <div>
        <label class="block font-semibold mb-1">Nom du Département</label>
        <input v-model="form.name" type="text" class="w-full border px-4 py-2 rounded" required />
      </div>

      <div>
        <label class="block font-semibold mb-1">Formateur Principal</label>
        <select v-model="form.principalInstructor" @change="updateSelectedStatus"
                class="w-full border px-4 py-2 rounded">
          <option value="">-- Aucun --</option>
          <option v-for="f in formateurs" :key="f._id" :value="f._id">
            {{ f.name }}
          </option>
        </select>
        <p v-if="selectedStatus" class="mt-2 text-sm">
          Statut : <span :class="statusClass">{{ selectedStatus }}</span>
        </p>
      </div>

      <div class="flex justify-end gap-4 pt-4">
        <button type="button" @click="closeModal" class="px-4 py-2 border rounded hover:bg-gray-100">Annuler</button>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Créer</button>
      </div>
    </form>
  </div>
</div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import { UseDepartement } from '@/composables/useDepartement';
const { createDepartement,assignFormateurToDepartement,getFormateursSansDepartement,getDepartements } = UseDepartement();
const showModal = ref(false)
const form = ref({ name: '', principalInstructor: '' })
const formateurs = ref([])
const selectedStatus = ref(null)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.value = { name: '', principalInstructor: '' }
  selectedStatus.value = null
}

const fetchFormateurs = async () => {
  try {
    const data = await getFormateursSansDepartement()
    formateurs.value = data;
    console.log('Utilisateurs récupérés pour le département:', formateurs.value);
  } catch (err) {
    console.error('Erreur chargement formateurs', err)
  }
}

const updateSelectedStatus = () => {
  const selectedFormateur = formateurs.value.find(f => f._id === form.value.principalInstructor)
  selectedStatus.value = selectedFormateur ? selectedFormateur.status : null
}


const statusClass = computed(() =>
  selectedStatus.value === 'Actif'
    ? 'text-green-600 font-semibold'
    : 'text-yellow-600 font-semibold'
)

const submitDepartement = async () => {
  try {
    const payload = {
      name: form.value.name,
      numberOfCourses: 0,
      principalInstructor: form.value.principalInstructor
    }

    const res = await createDepartement(payload)
    console.log('Réponse création département:',  res)
    const newDeptId = res.departement._id || res._id // selon ta réponse backend
    console.log('Nouveau département ID:', newDeptId)
    // assigner le formateur si sélectionné
    if (form.value.principalInstructor) {
      await assignFormateurToDepartement({
        userId: form.value.principalInstructor,
        departementId: newDeptId
      })
    }

    console.log('Département créé et formateur assigné')
    await fetchDepartements()
    closeModal()
  } catch (err) {
    console.error('Erreur création département', err)
  }
}

onMounted(() => {
  fetchFormateurs()
  fetchDepartements()
})


const departements = ref([])
const fetchDepartements = async () => {
  try {
    const data = await getDepartements()
    departements.value = data
    console.log('Départements chargés :', data)
  } catch (err) {
    console.error('Erreur chargement départements', err)
  }
}
const search = ref('')
const currentPage = ref(1)
const perPage = 5

const filteredDepartements = computed(() => {
  const filtered = departements.value.filter(d =>
    d.name.toLowerCase().includes(search.value.toLowerCase())
  )
  const start = (currentPage.value - 1) * perPage
  return filtered.slice(start, start + perPage)
})

const totalPages = computed(() =>
  Math.ceil(departements.value.filter(d =>
    d.name.toLowerCase().includes(search.value.toLowerCase())
  ).length / perPage)
)

const badgeClass = (statut) => {
  return statut === 'Actif'
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'
}


const editDept = (dept) => {
  console.log('Édite le département', dept)
}

const deleteDept = (id) => {
  departements.value = departements.value.filter(d => d.id !== id)
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>
