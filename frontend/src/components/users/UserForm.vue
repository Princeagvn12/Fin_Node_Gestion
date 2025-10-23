<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { useUsers } from '../../composables/user';

const router = useRouter()
const route = useRoute()
// const { addUser, fetchUser, updateUserData } = useUsers();

const user = ref({
  lastName: '',
  email: '',
  password: '',
  role: 'Etudiant',
  department: '',
})

const loading = ref(false)
const error = ref('')
const isEditMode = ref(false)

onMounted(async () => {
  //   const userId = route.params.id;
  //   if (userId) {
  //     isEditMode.value = true;
  //     try {
  //       const userData = await fetchUser(userId);
  //       user.value = { ...userData, password: '' };
  //     } catch (err) {
  //       error.value = "Erreur lors du chargement de l'utilisateur";
  //     }
  //   }
})

const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   loading.value = true;
  //   error.value = '';
  //   try {
  //     if (isEditMode.value) {
  //       await updateUserData(route.params.id, user.value);
  //     } else {
  //       await addUser(user.value);
  //     }
  //     router.push('/users');
  //   } catch (err) {
  //     error.value = err.message || 'Une erreur est survenue';
  //   } finally {
  //     loading.value = false;
  //   }
}
</script>

<template>
  <div class="p-4 max-w-2xl mx-auto  mt-20 shadow-sm bg-write ">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ isEditMode ? 'Modifier' : 'Ajouter' }} un utilisateur</h1>
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 ">
      {{ error }}
    </div>

    <form @submit="handleSubmit" class="space-y-6">
      <div class="">
       

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="lastName"
            v-model="user.lastName"
            required
            class="mt-1 p-3  block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500  outline-none"
          />
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          required
          class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 outline-none"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          {{
            isEditMode ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe'
          }}
        </label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          :required="!isEditMode"
          class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 outline-none"
        />
      </div>

      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
        <select
          id="role"
          v-model="user.role"
          required
          class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 outline-none"
        >
          <option value="student">Étudiant</option>
          <option value="teacher">Formateur</option>
          <option value="admin">Formateur-principale</option>
        </select>
      </div>

      <div>
        <label for="department" class="block text-sm font-medium text-gray-700 mb-1">Département</label>
        <select name="department" id="department" v-model="user.department" required class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 outline-none">
          <option value="informatique">Informatique</option>
          <option value="mathematique">Mathématique</option>
          <option value="cyber">Cyber-Securité</option>
          <option value="marketing">Marketing</option>
          <option value="ressources">Ressources humaines</option>
          <option value="ingenierie">Ingénierie</option>
        </select>
      </div>

      <div class="flex justify-center items-center">
        <!-- <button
          type="button"
          @click="router.push('/users')"
          class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
        >
          Annuler
        </button> -->
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 mx-auto w-50 cursor-pointer"
        >
          {{ loading ? 'Chargement...' : isEditMode ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>
