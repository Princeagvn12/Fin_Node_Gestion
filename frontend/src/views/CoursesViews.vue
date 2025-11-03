<script setup>
import { ref, onMounted } from 'vue'

// Exemple de données simulées (à remplacer par ton fetch backend)
const cours = ref([])

onMounted(() => {
  // Simule une récupération depuis l'API
  cours.value = [
    {
      nom: 'Introduction à la Programmation',
      code: 'PROG101',
      principal: 'Jean Dupont',
      associes: ['Ahmed Benali'],
      inscrits: 30
    },
    {
      nom: 'Gestion de Projet Agile',
      code: 'AGILE203',
      principal: 'Marie Curie',
      associes: ['Ahmed Benali', 'Sophie Martin'],
      inscrits: 45
    },
    {
      nom: 'Marketing Digital Avancé',
      code: 'MKT305',
      principal: 'Jean Dupont',
      associes: ['Sophie Martin'],
      inscrits: 50
    },
    {
      nom: 'Développement Web Fullstack',
      code: 'WEB401',
      principal: 'Marie Curie',
      associes: ['Sophie Martin'],
      inscrits: 38
    },
    {
      nom: 'Analyse de Données avec Python',
      code: 'DATA502',
      principal: 'Jean Dupont',
      associes: ['Sophie Martin'],
      inscrits: 25
    }
  ]
})
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Gestion des Cours</h1>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
        <i class="fas fa-plus"></i>
        Ajouter un cours
      </button>
    </div>

    <table class="min-w-full bg-white border border-gray-200 rounded shadow-sm">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="px-4 py-2">Nom du cours</th>
          <th class="px-4 py-2">Code</th>
          <th class="px-4 py-2">Formateur principal</th>
          <th class="px-4 py-2">Formateurs associés</th>
          <th class="px-4 py-2">Étudiants inscrits</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(c, index) in cours" :key="index">
          <td class="px-4 py-2">{{ c.nom }}</td>
          <td class="px-4 py-2 text-blue-600 font-semibold">{{ c.code }}</td>
          <td class="px-4 py-2">{{ c.principal }}</td>
          <td class="px-4 py-2">{{ c.associes.join(', ') }}</td>
          <td class="px-4 py-2">{{ c.inscrits }}</td>
          <td class="px-4 py-2 flex gap-3">
            <button class="hover:text-blue-600" title="Modifier">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-600 hover:text-red-800" title="Supprimer">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="text-gray-600 hover:text-gray-800" title="Formateurs">
              <i class="fas fa-chalkboard-teacher"></i>
            </button>
            <button class="hover:text-green-600" title="Étudiants">
              <i class="fas fa-users"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
