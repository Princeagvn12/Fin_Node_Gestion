<script setup>
import { useAuth } from '@/composables/auth';
import { ref } from 'vue';
const { user } = useAuth();
import { useRouter } from 'vue-router'

const avatarUrl = ref("https://cdn-icons-png.flaticon.com/512/1946/1946429.png")
const router = useRouter()
const { logout } = useAuth();

const handleLogout  = async () => {
  try {
    await logout()
  }
  catch (error) {
    console.log(error);
  }
}

// Fonction pour choisir l'image et l'enregistrer de façon permanente
const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log(file);
  /**restreindre le fichier selectioner */
  if (file && (file.type==="image/png" || file.type==="image/jpg" || file.type==="image/jpeg" || file.type==="image/gif" || file.type==="image/webp" || file.type==="image/svg" || file.type==="image/tiff")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      //    Base64 de l'image
      avatarUrl.value = e.target.result;
    };
    // Conversion du fichier en base64
    reader.readAsDataURL(file);
  }
};


</script>
<template>
  <!-- Navbar placeholder -->

    <header class="bg-white  shadow-sm p-4 flex justify-between items-center ">
      <h1 class="text-gray-900 text-sm">{{ user?.email}}</h1>
      <div class="flex items-center gap-4">
        <button @click="handleLogout" class="bg-[#385edd] text-white px-3 cursor-pointer py-1 rounded-lg text-sm hover:bg-[#6a84d8]">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
        <!-- <h1 class="text-lg font-semibold text-gray-700"> {{   }}</h1> -->
      <div class="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
        <label for="file" class="cursor-pointer">
        <img :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover rounded-full border border-gray-300" >
      </label>
        <input
          type="file"
          id="file"
          class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          @change="handleFileChange"
    />
      </div>
    </div>
  </header>
</template>

