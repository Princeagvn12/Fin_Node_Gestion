<script setup>
import Sidebar from '../components/admin/SidebarADMIN.vue';

</script>


<template>
<div class="flex bg-blue-100">
   <div>
     <Sidebar/>
    </div>

     <div class="bg-white w-full">
         <RouterView/>
     </div>

</div>
</template>


<style scoped>


</style>