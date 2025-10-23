<script setup>
import { ref } from 'vue'
import { useDepartment } from '../composables/useDepartment'
import { useRouter } from 'vue-router'

const router = useRouter()
const { create } = useDepartment()
const form = ref({ name: '', description: '' })

const save = async () => {
  await create(form.value)
  router.push('/departments')
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Nouveau Département</h1>
    <form @submit.prevent="save" class="space-y-3">
      <input v-model="form.name" placeholder="Nom" class="border p-2 w-full" required />
      <textarea v-model="form.description" placeholder="Description" class="border p-2 w-full"></textarea>
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
    </form>
  </div>
</template>
