<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUser } from '@/composables/user'
const { createUser, getUser,updateUser, deletUser, updateStatutUser,updateroleUser} = useUser()
const search = ref('')
const selected = ref([])

const users = ref([])
const loading = ref(false)
const ading = ref(false)

const form = ref({
  name: '',
  email: '',
  role: '',
  password: '',
  statut : 'Actif'
})

const showEditModal = ref(false)
const showModal = ref(false)


const openEditModal = (user) => {
  showEditModal.value = true
  form.value = { ...user } 
  console.log("valeu",form.value);
}

const modal = () =>{
  showModal.value=true
}

const openModal = ()=>{
  resetForm()
  showModal.value = false
}
const closeEditModal = () => {
  showEditModal.value = false
  resetForm()
}


const filteredUsers = computed(() =>
  users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
  )
)

const allSelected = computed(() => selected.value.length === users.value.length)

function toggleAll(e) {
  selected.value = e.target.checked ? users.value.map((u) => u.email) : []
}

const handleSubmit = async () => {
  try {
    await createUser(form.value); // form contient name, email, role
    console.log('Utilisateur ajouté ')  }
     catch (error) {
    console.error('Erreur ',  error.message)  }
};

const ReadUser = async () => {
  try {
const data = await getUser();

  users.value = data;
  console.log('Utilisateurs récupérés ')
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
  }
}


const delOneuser = async (id) => {
   await deletUser(id)
    console.log("✅ Supprimé avec succès :")
}


const updateStatut = async (id, statut) => {
  loading.value = true
  try {
    await updateStatutUser(id, statut)
    // toast.success(` Statut mis à jour : ${statut}`)
  } catch (err) {
    // toast.error(' Erreur lors de la mise à jour du statut')
  } finally {
    loading.value = false
  }
}

const updateRole = async (id, role) => {
  ading.value = true
  try {
    await updateroleUser(id, role)
    // toast.success(` Rôle mis à jour : ${role}`)
    console.log(' Rôle mis à jour');
    
  } catch (error) {
    // toast.error(' Erreur lors de la mise à jour du rôle')
    console.error('cce',error);
    
  } finally {
    ading.value = false
  }
}


const resetForm = () => {
  form.value.name = '',
  form.value.email = '',
  form.value.role = '',
  form.value.password = ''
}

onMounted(() => {
  ReadUser();
});

const submitEdit = async () => {
  try {
    if(form.value.id){
      const payload=  await updateUser(form.value)
       console.log(payload);
       console.log(' Utilisateur modifié')
        ReadUser()
       closeEditModal()
       resetForm()
    }
  } catch (error) {
    console.error(' Erreur modification', error)
  }
}

</script>
<template>
  <div v-if="showModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6 bg-white shadow w-1/2 rounded space-y-4">
     <div>
       <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
       <input v-model="form.name" type="text" id="name" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
     </div>
     <div>
       <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
       <input v-model="form.email" type="email" id="email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
     </div>
    
     <div>
       <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
       <select v-model="form.role" id="role" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
         <option value="">-- Sélectionner --</option>
         <option value="admin">Admin</option>
         <option value="formateur">Formateur</option>
         <option value="etudiant">Étudiant</option>
         <option value="rh">RH</option>
       </select>
     </div>
     <div>
    <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
    <input v-model="form.password" type="password" id="password" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
  </div>
     <div class="flex justify-between pt-4">
       <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter</button>
       <button type="button" @click="openModal" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Annuler</button>
     </div>
    </form>
  </div>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Gestion des utilisateurs</h2>
      <button @click="modal" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
        <i class="fas fa-user-plus"></i>
        Ajouter un nouvel utilisateur
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher par nom ou email..."
        class="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button class="ml-4 text-gray-600 hover:text-blue-600 flex items-center gap-2">
        <i class="fas fa-filter"></i>
        Filtres
      </button>
    </div>

    <!-- Table -->
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-100 text-left text-gray-700">
          <th class="px-4 py-2">
            <input type="checkbox" @change="toggleAll" :checked="allSelected" />
          </th>
          <th class="px-4 py-2">Nom</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Rôle</th>
          <th class="px-4 py-2">Statut</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.email"
          class="border-b"
        >
          <td class="px-4 py-2">
            <input type="checkbox" v-model="selected" :value="user.email" />
          </td>
          <td class="px-4 py-2">{{ user.name }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">
  <select
    v-model="user.role"
    @change="updateRole(user._id, user.role)"
    class="px-2 py-1 rounded border text-sm"
    :class="{
      'bg-blue-100 text-blue-700': user.role === 'admin',
      'bg-green-100 text-green-700': user.role === 'formateur',
      'bg-yellow-100 text-yellow-700': user.role === 'etudiant',
      'bg-purple-100 text-purple-700': user.role === 'rh'
    }"
  >
    <option value="admin">👑 Admin</option>
    <option value="formateur">📘 Formateur</option>
    <option value="etudiant">🎓 Étudiant</option>
    <option value="rh">🧑‍💼 RH</option>
  </select>
</td>

          <td class="px-4 py-2">
             <select
    v-model="user.statut"
    @change="updateStatut(user._id, user.statut)"
     :disabled="loading"
    class="px-2 py-1 rounded border text-sm"
    :class="user.statut === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
  >
    <option value="Actif">✅ Actif</option>
    <option value="Inactif">⛔ Inactif</option>
  </select>
          </td>
          <td class="px-4 py-2 flex gap-3 text-gray-600" >
            <div >
              <i  @click="openEditModal(user)" class="fas fa-edit hover:text-blue-600 cursor-pointer"></i>
            </div>
            <div @click="delOneuser(user.id)">
              <i class="fas fa-trash-alt hover:text-red-600 cursor-pointer"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="showEditModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-lg shadow-lg  w-1/2 space-y-4">
    <h3 class="text-xl font-semibold mb-4">Modifier l’utilisateur</h3>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nom</label>
        <input v-model="form.name" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="form.email" type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-6">
      <button @click="closeEditModal" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Annuler</button>
      <button @click="submitEdit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Enregistrer</button>
    </div>
  </div>
</div>

</template>