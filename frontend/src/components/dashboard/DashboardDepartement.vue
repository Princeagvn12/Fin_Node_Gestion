<script setup>
      import { ref, computed } from 'vue'
      import DepartementTable from '../departments/DepartmentTable.vue'
      import DepartementModal from '../departments/DepartmentModal.vue'
      import Pagination from '../departments/Pagination.vue'
      
      const departements = ref([
        { nom: 'Informatique', formateur: 'Alice Tremblay', cours: 15, statut: 'Actif' },
        { nom: 'Marketing', formateur: 'Bob Dupont', cours: 20, statut: 'Actif' },
        { nom: 'Finance', formateur: 'Carole Lefebvre', cours: 10, statut: 'Actif' },
        { nom: 'Ressources Humaines', formateur: 'David Martin', cours: 8, statut: 'Inactif' },
        { nom: 'Ingénierie', formateur: 'Eve Dubois', cours: 12, statut: 'Actif' },
      ])
      
      const search = ref('')
      const page = ref(1)
      const totalPages = 3
      const showModal = ref(false)
      
      const filteredDepartements = computed(() =>
        departements.value.filter(d =>
          d.nom.toLowerCase().includes(search.value.toLowerCase())
        )
      )
      
      function openModal() {
        showModal.value = true
      }
      function closeModal() {
        showModal.value = false
      }
      function saveDepartement(newDept) {
        departements.value.push(newDept)
        closeModal()
      }
      function editDepartement(dept) {
        console.log('Edit:', dept)
      }
      function deleteDepartement(dept) {
        departements.value = departements.value.filter(d => d !== dept)
      }
      function changePage(newPage) {
        page.value = newPage
      }
</script>
<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Gestion des Départements</h1>
      <button @click="openModal" class="btn-primary">Créer un Département</button>
    </div>

    <input
      v-model="search"
      type="text"
      placeholder="Rechercher un département..."
      class="input w-full"
    />

    <DepartementTable
      :departements="filteredDepartements"
      @edit="editDepartement"
      @delete="deleteDepartement"
    />

    <Pagination :currentPage="page" :totalPages="totalPages" @change="changePage" />

    <DepartementModal v-if="showModal" @close="closeModal" @save="saveDepartement" />
  </div>
</template>
