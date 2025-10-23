<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';



</script>


<template>

<div class="flex h-screen bg-gray-100">
    <Sidebar/>
    <div class="flex flex-col flex-1">
        <Navbar/>
        <main class="flex-1 p-6 overflow-y-auto">
            <router-view />
        </main>
    </div>
</div>

</template>


<style scoped>
</style>