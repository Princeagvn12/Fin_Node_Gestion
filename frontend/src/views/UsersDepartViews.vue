<!-- <template>
  <section class="p-6 bg-gray-50">
    <header class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">🎓 Gestion des Départements</h1>
      <div class="flex gap-4">
        <button @click="openModal" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          ➕ Créer un Département
        </button>
        <input v-model="search" type="search" placeholder="🔍 Rechercher un département..."
               class="px-4 py-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
    </header>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded shadow">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-6 py-3 text-left">🏷️ Nom</th>
            <th class="px-6 py-3 text-left">👩‍🏫 Formateur</th>
            <th class="px-6 py-3 text-left">📚 Cours</th>
            <th class="px-6 py-3 text-left">📌 Statut</th>
            <th class="px-6 py-3 text-left">⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dept in filteredDepartements" :key="dept.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ dept.nom }}</td>
            <td class="px-6 py-4">{{ dept.formateur }}</td>
            <td class="px-6 py-4">{{ dept.cours }}</td>
            <td class="px-6 py-4">
              <span :class="badgeClass(dept.statut)" class="inline-block px-2 py-1 text-sm font-semibold rounded">
                {{ dept.statut }}
              </span>
            </td>
            <td class="px-6 py-4 flex gap-2">
              <button @click="editDept(dept)" class="text-blue-600 hover:text-blue-800">✏️</button>
              <button @click="deleteDept(dept.id)" class="text-red-600 hover:text-red-800">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="mt-6 flex justify-center items-center gap-4 text-gray-600">
      <button @click="prevPage" class="px-3 py-1 border rounded hover:bg-gray-100">◀️</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" class="px-3 py-1 border rounded hover:bg-gray-100">▶️</button>
    </footer>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const departements = ref([
  { id: 1, nom: 'Informatique', formateur: 'Alice Tremblay', cours: 15, statut: 'Actif' },
  { id: 2, nom: 'Marketing', formateur: 'Bob Dupont', cours: 10, statut: 'Actif' },
  { id: 3, nom: 'Finance', formateur: 'Carole Lefebvre', cours: 9, statut: 'Actif' },
  { id: 4, nom: 'RH', formateur: 'David Martin', cours: 8, statut: 'Inactif' },
  { id: 5, nom: 'Ingénierie', formateur: 'Eve Dubois', cours: 12, statut: 'Actif' },
  // Ajoute d'autres départements ici
])

const search = ref('')
const currentPage = ref(1)
const perPage = 5

const filteredDepartements = computed(() => {
  const filtered = departements.value.filter(d =>
    d.nom.toLowerCase().includes(search.value.toLowerCase())
  )
  const start = (currentPage.value - 1) * perPage
  return filtered.slice(start, start + perPage)
})

const totalPages = computed(() =>
  Math.ceil(departements.value.filter(d =>
    d.nom.toLowerCase().includes(search.value.toLowerCase())
  ).length / perPage)
)

const badgeClass = (statut) => {
  return statut === 'Actif'
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'
}

const openModal = () => {
  console.log('Ouvre la modale de création')
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
</script> -->
