<script setup>
import {ref, onMounted,computed } from 'vue';
import { useUsers } from '../../composables/user';

const {getAllUsers,
		createUser,
		updateUser,
		deleteUser} = useUsers(); 


// const { users, loading, error, fetchUsers, removeUser } = useUsers();
//rechercher les utilissateurs
const utilisateur = ref([]);
const query = ref('');


// const MOCK_USERS = [
//   {_id: 1, name: 'John Doe', email: 'johndoe@example', role: 'Etudiant',status: 'Actif' },
// {
//   _id: 2,
//   name:'dupont',
//   email: 'johndoe@example',
//   role: 'Formateur_principale',
//   status: 'inactif'
// },
//   {
//     _id: 3,
//     name:'marie',
//     email: 'marie@example',
//     role: 'Formateur',
//     status: 'actif'
//   }
// ];

utilisateur.value = MOCK_USERS;


const users = computed(() => {
  if (!query.value) return utilisateur.value;
  return utilisateur.value.filter(c =>
    c.email && c.email.toLowerCase().includes(query.value.toLowerCase()) ||
    (c.name && c.name.toLowerCase().includes(query.value.toLowerCase()))
  );
});



onMounted(() => {
  // fetchUsers();
});

//modifier un utilisateur

const showEditForm = ref(false);
const selectedUse = ref(null);




const handleEdit = (users) => {
  selectedUse.value = { ...users };
  showEditForm.value = true;
};

const handleUpdate = () => {
  const index = courses.value.findIndex(c => c._id === selectedUse.value._id);
  if (index !== -1) {
    // TODO: call API to update
    courses.value[index] = { ...selectedUse.value };
  }
  showEditForm.value = false;
};

const handleDelete = async (userId) => {
  // if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
  //   try {
  //     await removeUser(userId);
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression:', error);
  //   }
  // }
};
</script>

<template>
  <div class=" max-w-4xl mx-auto mt-20 shadow sm:rounded-lg p-10">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-center">Gestion des utilisateurs</h1>
          <RouterLink 
        to="/admin/users/useform"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex w-50 items-center"
      >
        <span class="mr-2">+</span> Ajouter un utilisateur
      </RouterLink>
    </div>

    <div class="mb-4 flex gap-2">
      <div>
        <input v-model ="query" class=" h-10 border border-gray-200 rounded-lg outline-none px-4 py-2 w-200" type="search" name="recherche" id="recherche" placeholder="Rechercher par titre, email d'un utilisateur">
      </div>
    
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else class="bg-white max-w-3xl mx-auto rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th><input type="checkbox" name="" id=""></th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
            <td><input type="checkbox" name="" id=""></td>
            <td class="px-6 py-4 whitespace-nowrap"> {{ user.lastName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': user.role === 'admin',
                      'bg-blue-100 text-blue-800': user.role === 'formateur',
                      'bg-yellow-100 text-yellow-800': user.role === 'student',
                       'bg-blue-100 text-blue-800': user.role === 'formateur_principale',
                    }">
                {{ user.role }}
              </span>
            </td>
               <td class="px-6 py-4 whitespace-nowrap">{{ user.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">


              <button @click="handleEdit(c)" class="text-yellow-600 mr-3"><i class="ri-edit-2-line"></i></button>
           
              <button 
                @click="handleDelete(user._id)"
                class="text-red-600 hover:text-red-900 cursor-pointer"
              >
              <i class="ri-delete-bin-6-line"></i> 
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
             <td colspan="4" class="px-4 py-6 text-center text-gray-500">Aucun cours trouvé.</td>
          </tr>
        </tbody>
      </table>
    </div>


     <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Modifier le utilisateurs</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">NOM</label>
            <input v-model="selectedUse.name" type="text" class="mt-1 block w-full border rounded-md px-3 py-2">
          </div>

               <div>
            <label class="block text-sm font-medium text-gray-700">ROLE</label>
            <input v-model="selectedUse.role" type="text" class="mt-1 block w-full border rounded-md px-3 py-2">
          </div>
          
            <div>
            <label class="block text-sm font-medium text-gray-700">EMAIL</label>
            <input v-model="selectedUse.email" type="text" class="mt-1 block w-full border rounded-md px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">STATUT</label>
            <select class="mt-1 block w-full border rounded-md px-3 py-2" v-model="selectedUse.status" name="" id="">
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button @click="showEditForm = false" class="px-4 py-2 border rounded-md text-gray-600">
              Annuler
            </button>
            <button @click="handleUpdate" class="px-4 py-2 bg-blue-500 text-white rounded-md">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>