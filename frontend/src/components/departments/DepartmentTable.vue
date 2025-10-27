<template>
  <table class="table-auto w-full border">
    <thead>
      <tr class="bg-gray-100 text-left">
        <th class="px-4 py-2">Nom du Département</th>
        <th class="px-4 py-2">Formateur Principal</th>
        <th class="px-4 py-2">Nombre de Cours</th>
        <th class="px-4 py-2">Statut</th>
        <th class="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dept in departements" :key="dept.nom" class="border-t hover:bg-gray-50">
        <td class="px-4 py-2">{{ dept.nom }}</td>
        <td class="px-4 py-2">{{ dept.formateur }}</td>
        <td class="px-4 py-2">{{ dept.cours }}</td>
        <td class="px-4 py-2">
          <span :class="dept.statut === 'Actif' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
            {{ dept.statut }}
          </span>
        </td>
        <td class="px-4 py-2 space-x-2">
          <button @click="$emit('edit', dept)" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-pen"></i>
          </button>
          <button @click="$emit('delete', dept)" class="text-red-600 hover:text-red-800">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['departements'])
</script>
