<script setup>
import { ref } from 'vue';

const totalUsers = ref(150); // Exemple de valeur
const newUsersThisMonth = ref(15);
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow ">
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
  
</template>

<style scoped>
.ri-user-line, .ri-arrow-up-line {
  line-height: 1;
}
</style>