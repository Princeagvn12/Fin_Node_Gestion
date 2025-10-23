<script setup>

</script>


<template>
  <nav class="w-70 bg-white border-r border-gray-200 min-h-screen p-4">
    <ul class="space-y-2">
      <li>
        <RouterLink to="/" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <i class="ri-dashboard-fill text-xl text-gray-600"></i>
          <span class="text-sm font-medium">Tableau de bord</span>
        </RouterLink>
      </li>

      <li>
        <router-link to="/users/uselist" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <i class="ri-group-line text-xl text-gray-600"></i>
          <span class="text-sm font-medium">Gestion des utilisateurs</span>
        </router-link>
      </li>

      <li>
        <router-link to="/department/departlist" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <i class="ri-store-line text-xl text-gray-600"></i>
          <span class="text-sm font-medium">Gestion des départements</span>
        </router-link>
      </li>

      <!-- Example of nested/section header -->
      <li class="mt-4 px-3 text-xs text-gray-400 uppercase">Autres</li>
      <li>
        <RouterLink to="" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <i class="ri-settings-line text-xl text-gray-600"></i>
          <span class="text-sm font-medium">Paramètres</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>


<style scoped>
/* ensure icons vertically centered and consistent size */
.ri-dashboard-fill, .ri-group-line, .ri-store-line, .ri-settings-line {
  line-height: 1;
}

/* mobile: collapse width to auto if needed (managed by parent layout) */
@media (max-width: 640px) {
  nav {
    width: 100%;
    min-height: auto;
  }
}
</style>