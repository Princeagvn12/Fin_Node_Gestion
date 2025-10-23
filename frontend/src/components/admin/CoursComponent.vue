<script setup>
import { ref } from 'vue';
//cours
const totalCours = ref(150); // Exemple de valeur
const newCoursThisMonth = ref(15);
//formateur
const totalFormateurs = ref(150); // Exemple de valeur
const newFormateursThisMonth = ref(85);
</script>


<template>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-80 ">
    
  <div class=" rounded-lg w-80 shadow-lg p-6 w-70 hover:shadow-xl transition-shadow h-full -ml-5 mb-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-700">Cours Totaux</h2>
      <div class="p-3 bg-purple-100 rounded-full">
        <i class="ri-user-line text-xl text-purple-600"></i>
      </div>
    </div>
    
    <div class="space-y-2">
      <p class="text-3xl font-bold text-gray-900">{{ totalCours }}</p>
      
      <div class="flex items-center text-sm">
        <span class="flex items-center text-green-600">
          <i class="ri-arrow-up-line mr-1"></i>
          +{{ newCoursThisMonth }}
        </span>
        <span class="ml-2 text-gray-500"> nouveau cours</span>
      </div>
    </div>
  </div>
    

     <div class=" rounded-lg lg:-ml-40  shadow-lg w-80 p-6 hover:shadow-xl transition-shadow h-full ">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-700">Formateurs Actifs</h2>
      <div class="p-3 bg-purple-100 rounded-full">
        <i class="ri-user-line text-xl text-purple-600"></i>
      </div>
    </div>
    
    <div class="space-y-2">
      <p class="text-3xl font-bold text-gray-900">{{ totalFormateurs }}</p>
      
      <div class="flex items-center text-sm">
        <span class="flex items-center text-green-600">
          <i class="ri-arrow-up-line mr-1"></i>
          {{ newFormateursThisMonth }} %
        </span>
        <span class="ml-2 text-gray-500">des formateurs</span>
      </div>
    </div>
  </div>

</div>


</template>


<style scoped>


</style>