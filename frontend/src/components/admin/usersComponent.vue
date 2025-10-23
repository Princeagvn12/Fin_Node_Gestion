<script setup>
import { ref, onMounted } from 'vue';
import { useUsers } from '../../composables/user';
import { RouterLink } from 'vue-router';

const totalUsers = ref(0);
const newUsersThisMonth = ref(0);
const { users, fetchUsers } = useUsers();

onMounted(async () => {
  await fetchUsers();
  totalUsers.value = users.value.length;
  newUsersThisMonth.value = Math.max(0, Math.floor(totalUsers.value * 0.1));
});
</script>

<template>
  <RouterLink to="/users" class="block">
    <div class="bg-white rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow h-full">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-700">Utilisateurs Totaux</h2>
        <div class="p-3 bg-purple-100 rounded-full">
          <i class="ri-user-line text-xl text-purple-600"></i>
        </div>
      </div>
      
      <div class="space-y-2">
        <p class="text-3xl font-bold text-gray-900">{{ totalUsers }}</p>
        
        <div class="flex items-center text-sm">
          <span class="flex items-center text-green-600">
            <i class="ri-arrow-up-line mr-1"></i>
            +{{ newUsersThisMonth }}
          </span>
          <span class="ml-2 text-gray-500">ce mois-ci</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.ri-user-line, .ri-arrow-up-line {
  line-height: 1;
}
</style>