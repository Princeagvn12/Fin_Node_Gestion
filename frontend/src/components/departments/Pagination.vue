<template>
  <div class="flex justify-center items-center space-x-2 mt-4">
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      Précédent
    </button>

    <button
      v-for="n in totalPages"
      :key="n"
      @click="$emit('change', n)"
      :class="[
        'px-3 py-1 border rounded text-sm',
        n === currentPage ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-100'
      ]"
    >
      {{ n }}
    </button>

    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      Suivant
    </button>
  </div>
</template>

<script setup>
defineProps(['currentPage', 'totalPages'])
</script>
