<script setup>
const dashViews = [
  { key: "dashboard", label: "DashboardAdmin", to: { name: "dashboardadmin" } },
  { key: "dashboard-users", label: "Gestion des utilisateurs", to: { name: "dashboard-users" } },
  {
    key: "departements",
    label: "Gestion des Departement",
    to: { name: "departements" },
  },
  {
    key: "coursdash",
    label: "Gestion des cours",
    to: { name: "coursdash" },
  },
  {
    key: "student",
    label: "Mes cours",
    to: { name: "student" },
  },
];
</script>

<template>
  <div class="w-64 bg-white flex flex-col border-r border-gray-200">
    <div class="text-(--color-linkbtn) text-3xl pt-2 pb-3.5 font-bold text-center">
      <i class="fa-solid fa-graduation-cap"></i>EduTrack RH
    </div>
    <nav class="flex-1 p-4 space-y-2">
      <RouterLink
        v-for="dash in dashViews"
        :key="dash.key"
        :to="dash.to"
        class="block px-4 py-2 rounded-lg font-medium transition"
        :class="[
          $route.name === dash.to.name
            ? 'bg-[#6a84d8] text-white'
            : 'text-gray-700 hover:bg-gray-200',
        ]"
      >
        {{ dash.label }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped></style>
