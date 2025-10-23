<script setup>
import { onMounted } from 'vue';
// import { useUsers } from '../../composables/user';
// import { RouterLink } from 'vue-router';

// const { users, loading, error, fetchUsers, removeUser } = useUsers();

onMounted(() => {
  // fetchUsers();
});

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
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des utilisateurs</h1>
    </div>

    <div class="flex gap-6 m-4">
      <div>
        <input class="w-150 h-10 border border-gray-200 rounded-lg outline-none" type="search" name="recherche" id="recherche">
      </div>
        <RouterLink 
        to="/users/useform"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex w-50 items-center"
      >
        <span class="mr-2">+</span> Ajouter un utilisateur
      </RouterLink>
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
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
              <RouterLink 
                :to="'/users/edit/' + user._id"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Modifier
              </RouterLink>
              <button 
                @click="handleDelete(user._id)"
                class="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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