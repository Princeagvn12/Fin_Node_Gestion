<script setup>
import { ref } from "vue";

const email = ref("");
const message = ref(null);
const error = ref(null);

const submit = async () => {
  message.value = "Si cet e-mail existe, vous recevrez un lien de réinitialisation.";
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-semibold mb-6 text-blue-600">
        Réinitialiser le mot de passe
      </h2>
      <p class="mb-4">
        Entrez votre adresse e-mail. Nous vous enverrons un lien pour réinitialiser votre
        mot de passe.
      </p>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-600 text-white px-4 py-2 rounded">Envoyer</button>
        </div>
      </form>
      <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
      <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    </div>
  </div>
</template>
