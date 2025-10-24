<script setup>
import { useAuth } from '@/composables/auth';
const { user } = useAuth();
const userName = user.name
console.log(userName);
</script>


<template>

<div>
  {{ user.name }}
</div>

</template>


<style scoped>


</style>