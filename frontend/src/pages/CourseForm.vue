<!-- 
<script setup>
import { ref, onMounted } from 'vue'
import { useCourse } from '../composables/useCourse'
import { useDepartment } from '../composables/useDepartement.js' // ✅ chemin corrigé
import { useRouter } from 'vue-router'

const { create } = useCourse()
const { getAll: getDepts } = useDepartment()
const router = useRouter()

const departments = ref([])
const loading = ref(false)
const form = ref({ title: '', description: '', department: '', mainTeacher: '' })

// 🔹 Récupération des départements au montage
onMounted(async () => {
  try {
    departments.value = await getDepts()
  } catch (err) {
    console.error("Erreur lors de la récupération des départements :", err)
  }
})

// 🔹 Fonction de sauvegarde du cours
const save = async () => {
  loading.value = true
  try {
    await create(form.value)
    router.push('/courses') // redirection après succès
  } catch (err) {
    console.error("Erreur lors de la création du cours :", err)
    alert("Une erreur est survenue lors de la création du cours.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Nouveau Cours</h1>

    <form @submit.prevent="save" class="space-y-3">
      <input v-model="form.title" placeholder="Titre du cours" class="border p-2 w-full" required />
      
      <textarea v-model="form.description" placeholder="Description" class="border p-2 w-full"></textarea>

      <select v-model="form.department" class="border p-2 w-full" required>
        <option disabled value="">-- Sélectionner un département --</option>
        <option v-for="d in departments" :key="d._id" :value="d._id">{{ d.name }}</option>
      </select>

      <input v-model="form.mainTeacher" placeholder="ID du formateur principal (temporaire)" class="border p-2 w-full" />

      <button
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </form>
  </div>
</template> -->



<script setup>
import { ref } from 'vue'
import { useCourse } from '../composables/useCourse'
import { useDepartment } from '../composables/useDepartement.js'
import { useRouter } from 'vue-router'

const { create } = useCourse()
const {getAll } = useDepartment()
const router = useRouter()

const departments = ref([])
const loading = ref(false)
const loadingDepartments = ref(false) // 🔹 pour indiquer qu’on charge les départements
const form = ref({ title: '', description: '', department: '', mainTeacher: '' })

// 🔹 Chargement des départements uniquement quand on clique sur le select
const loadDepartments = async () => {
  //   departments.value = [
  //   { _id: "1", name: "Informatique" },
  //   { _id: "2", name: "Mathématiques" },
  //   { _id: "3", name: "Physique" },
  // ]

  if (departments.value.length > 0) return // éviter de recharger si déjà fait
  loadingDepartments.value = true
  try {
    departments.value = await getAll()
    console.log(departments.value);
  } catch (err) {
    console.error("Erreur lors du chargement des départements :", err)
    alert("Impossible de charger les départements.")
  } finally {
    loadingDepartments.value = false
  }
}

// 🔹 Fonction de sauvegarde du cours
const save = async () => {
  loading.value = true
  try {
    await create(form.value)
    router.push('/courses')
  } catch (err) {
    console.error("Erreur lors de la création du cours :", err)
    alert("Une erreur est survenue lors de la création du cours.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Nouveau Cours</h1>

    <form @submit.prevent="save" class="space-y-3">
      <input v-model="form.title" placeholder="Titre du cours" class="border p-2 w-full" required />
      
      <textarea v-model="form.description" placeholder="Description" class="border p-2 w-full"></textarea>

      <!-- 🔹 Le select déclenche le chargement des départements -->
      <select
        v-model="form.department"
        class="border p-2 w-full"
        required
        @click="loadDepartments"
      >
        <option disabled value="">
          {{ loadingDepartments ? 'Chargement...' : '-- Sélectionner un département --' }}
        </option>
        <option v-for="d in departments" :key="d._id" :value="d._id">
          {{ d.name }}
        </option>
      </select>

      <input v-model="form.mainTeacher" placeholder="ID du formateur principal (temporaire)" class="border p-2 w-full" />

      <button
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </form>
  </div>
</template>

