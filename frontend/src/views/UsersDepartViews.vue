<script setup>
import departmentComponent from '@/components/admin/departmentComponent.vue';
import usersComponent from '@/components/admin/usersComponent.vue';

</script>


<template>

    <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

        <div> 
            <usersComponent/>
        </div>
        <div>
            <departmentComponent/>
        </div>
    </div>

</template>


<style scoped>


</style>