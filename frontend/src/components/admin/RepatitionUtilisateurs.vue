<script setup>

import { ref } from 'vue';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Données exemple (à remplacer par les données réelles de l'API)
const userData = ref({
  labels: ['Étudiants', 'Formateurs principaux', 'Formateurs', 'Administrateurs'],
  datasets: [{
    label: 'Répartition (%)',
    data: [70, 20, 20, 10],
    backgroundColor: [
      'rgba(54, 162, 235, 0.8)',   // Bleu pour les étudiants
      'rgba(75, 192, 192, 0.8)',   // Vert clair pour formateurs principaux
      'rgba(102, 181, 255, 0.8)',  // Bleu clair pour formateurs
      'rgba(153, 102, 255, 0.8)',  // Violet pour les admins
    ],
    borderColor: [
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(102, 181, 255, 1)',
      'rgba(153, 102, 255, 1)',
    ],
    borderWidth: 1
  }]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.dataset.label || context.label}: ${context.raw}%`;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Rôle'
      },
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Pourcentage (%)'
      },
      max: 100
    }
  }
};

// Récupérer les données réelles des utilisateurs via le composable

</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold  text-gray-700">Répartition des Utilisateurs</h2>
      <div class="p-3 bg-indigo-100 rounded-full">
        <i class="ri-pie-chart-line text-xl text-indigo-600"></i>
      </div>
    </div>

    <div class="h-[300px]">
      <Bar 
        :data="userData" 
        :options="chartOptions"
      />
    </div>

    <!-- Stats sommaires sous le graphique -->
    <div class="grid grid-cols-3 gap-4 mt-6 text-center">
      <div class="p-3 bg-blue-400 rounded-lg">
        <p class="text-sm text-white">Étudiants</p>
        <p class="text-xl font-bold text-blue-600">70%</p>
      </div>
         <div class="p-3 bg-green-200 rounded-lg">
        <p class="text-sm text-white">Formateur-principal</p>
        <p class="text-xl font-bold text-green-600">20%</p>
      </div>
      <div class="p-3 bg-blue-300 rounded-lg">
        <p class="text-sm text-white">Formateur</p>
        <p class="text-xl font-bold text-green-600">20%</p>
      </div>
      <div class="p-3 bg-purple-400 rounded-lg">
        <p class="text-sm text-white">Admins</p>
        <p class="text-xl font-bold text-purple-600">10%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ri-pie-chart-line {
  line-height: 1;
}
</style>