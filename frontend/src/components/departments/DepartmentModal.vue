<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
      <h2 class="text-xl font-bold">Créer un Département</h2>
      <input v-model="nom" placeholder="Nom du département" class="input w-full" />
      <input v-model="formateur" placeholder="Formateur principal" class="input w-full" />
      <input v-model.number="cours" type="number" placeholder="Nombre de cours" class="input w-full" />
      <select v-model="statut" class="input w-full">
        <option>Actif</option>
        <option>Inactif</option>
      </select>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="btn-secondary">Annuler</button>
        <button @click="save" class="btn-primary">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const nom = ref('')
const formateur = ref('')
const cours = ref(0)
const statut = ref('Actif')

function save() {
  $emit('save', { nom: nom.value, formateur: formateur.value, cours: cours.value, statut: statut.value })
}
</script>
