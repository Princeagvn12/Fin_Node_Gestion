<script setup>
import { useAuth } from '@/composables/auth';
const { user } = useAuth();
</script>

<template>
<h1> B'ienvenue {{ user.name }}</h1>
</template>

<style scoped>
</style>