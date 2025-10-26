<script setup>
import { useAuth } from '@/composables/auth';
import UsersViews from '@/views/UsersViews.vue';
const { user } = useAuth();
</script>

<template>
<h1> B'ienvenue {{ user.name }}</h1>
<UsersViews/>
<!-- <UsersViews/> -->
</template>

<style scoped>
</style>