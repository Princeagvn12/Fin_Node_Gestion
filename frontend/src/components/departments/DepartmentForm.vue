<script setup>
import { ref, onMounted,computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { useDepartments } from '../../composables/department';
// import { useUsers } from '../../composables/user';

const router = useRouter();
const route = useRoute();
// const { addDepartment, fetchDepartment, updateDepartmentData } = useDepartments();
// const { users, fetchUsers } = useUsers();

const department = ref({
  name: '',
  description: '',
  mainTeacher: ''
});

const loading = ref(false);
const error = ref('');
const isEditMode = ref(false);

onMounted(async () => {
  // // Charger les enseignants
  // await fetchUsers();
  
  // // Si on est en mode édition, charger le département
  // const deptId = route.params.id;
  // if (deptId) {
  //   isEditMode.value = true;
  //   try {
  //     const deptData = await fetchDepartment(deptId);
  //     department.value = deptData;
  //   } catch (err) {
  //     error.value = "Erreur lors du chargement du département";
  //   }
  // }
});

const handleSubmit = async (e) => {
  // e.preventDefault();
  // loading.value = true;
  // error.value = '';

  // try {
  //   if (isEditMode.value) {
  //     await updateDepartmentData(route.params.id, department.value);
  //   } else {
  //     await addDepartment(department.value);
  //   }
  //   router.push('/departments');
  // } catch (err) {
  //   error.value = err.message || 'Une erreur est survenue';
  // } finally {
  //   loading.value = false;
  // }
};

const teachers = computed(() => {
  // return users.value.filter(user => user.role === 'teacher');
});
</script>

<template>
  <div class="p-4 max-w-2xl mx-auto mt-20 m-10 shadow-sm bg-write ">
    <div class="mb-6">
      <h1 class="text-2xl text-center font-bold">{{ isEditMode ? 'Modifier' : 'Ajouter' }} un département</h1>
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form @submit="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block  text-sm font-medium text-gray-700 mb-1">Nom du département</label>
        <input
          type="text"
          id="name"
          v-model="department.name"
          required
          class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 outline-none"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          v-model="department.description"
          rows="4"
          class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 outline-none"
        ></textarea>
      </div>

      <div>
        <label for="mainTeacher" class="block text-sm font-medium text-gray-700 mb-1">Formateur principal</label>
        <select
          id="mainTeacher"
          v-model="department.mainTeacher"
          required
          class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 outline-none"
        >
          <option value="od">Sélectionner un enseignant</option>
          <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
            {{ teacher.firstName }} {{ teacher.lastName }}
          </option>
        </select>
      </div>

      <div class=" flex justify-center items-center   pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 w-50 cursor-pointer disabled:opacity-50 "
        >
          {{ loading ? 'Chargement...' : (isEditMode ? 'Modifier' : 'Ajouter') }}
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>

</style>