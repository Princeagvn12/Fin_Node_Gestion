<script setup>
const dashViews = [
  {
    key: "dashboard",
    label: "DashboardAdmin",
    icon: "fa-solid fa-chart-line",
    to: { name: "dashboardadmin" },
  },
  {
    key: "dashboard-users",
    label: "Gestion des utilisateurs",
    icon: "fa-solid fa-users-cog",
    to: { name: "dashboard-users" },
  },
  {
    key: "departements",
    label: "Gestion des Departement",
    icon: "fa-solid fa-building",
    to: { name: "departements" },
  },
  {
    key: "coursdash",
    label: "Gestion des cours",
    icon: "fa-solid fa-book-open",
    to: { name: "coursdash" },
  },
  {
    key: "student",
    label: "Mes cours",
    icon: "fa-solid fa-user-graduate",
    to: { name: "student" },
  },
];
</script>

<template>
  <div class="w-64 bg-white flex flex-col border-r border-gray-200">
    <div class="text-[#6a84d8] text-3xl pt-2 pb-3.5 font-bold text-center">
      <i class="fa-solid fa-graduation-cap"></i> EduTrack RH
    </div>
    <nav class="flex-1 p-4 space-y-2">
      <RouterLink
        v-for="dash in dashViews"
        :key="dash.key"
        :to="dash.to"
        class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition"
        :class="[
          $route.name === dash.to.name
            ? 'bg-[#6a84d8] text-white'
            : 'text-gray-700 hover:bg-gray-200',
        ]"
      >
        <i :class="dash.icon"></i>
        {{ dash.label }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped></style>
