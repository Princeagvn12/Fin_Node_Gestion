<script setup>
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
})

</script>

<template>
  <div class="flex justify-between items-center h-full">
    <div class="w-1/2 pl-6">
      <img src="../../../public/auth-img1.png" alt="Connexion" />
    </div>
    <div class="w-1/2 bg-[var(--color-background)] px-40 h-screen pt-25">
      <div>
        <div class="text-[var(--color-linkb)] text-4xl font-bold  text-center">

          <i class="fa-solid fa-graduation-cap "></i> 
          EduTrack RH
        </div>
      </div>
      <div>
        <h1 class="font-medium text-3xl py-8 text-[var(--color-linkbtn)]">Bienvenue sur EduTrack RH! 👋</h1>
        <p>Veuillez vous connecter à votre compte et commencer l'aventure</p>
        <div>
          <form  @submit.prevent="handeLogin">
            <div>
              <h2 class="mb-2 mt-8 font-semibold">Adresse E-mail</h2>
              <div class="p-2 border-neutral-300 rounded-[8px] flex border items-center gap-2.5">
                <i class="fa-regular fa-user"></i>
                <input  v-model="form.email" type="email"
                  class="w-full border-none outline-none"
                 placeholder="exemple@email.com" required />
                />
              </div>
            </div>
            <div class="mt-5">
              <h2 class="mb-2 font-semibold">Mot de passe </h2>

              <div class="rounded-lg p-2 flex border border-neutral-300 items-center gap-2.5">
                <i class="fa-solid fa-lock"></i>
                <input
                  class="w-full border-none outline-none"
                  type="text"
                  placeholder="Entrez le mot de passe actuel"
                />
                <i class="fa-solid fa-eye-slash cursor-pointer"></i>
              </div>
            </div>
            <div class="flex justify-between items-center mt-5">
              <div class="flex items-center gap-0.2">
                <input type="checkbox" class="" /><label for="" class="ml-2 font-semibold text-sm"
                  >Souviens-toi de moi</label
                >
              </div>
              <div class="text-[var(--color-linkbtn)] font-medium cursor-pointer">
                Mot de passe oublié?
              </div>
            </div>
            <input
              type="submit"
              value="Se connecter"
              class="w-full font-semibold text-center py-2 flex text-[var(--color-background)] my-8 rounded-3xl bg-[var(--color-linkbtn)]"
            />
          </form>
          <div class="text-center mb-12">
            Nouveau sur notre plateforme ?
            <router-link class="text-[var(--color-linkbtn)] font-semibold" to="/register">Créer un compte</router-link>

          </div>
        </div>
        <div class="flex justify-between items-center mb-12">
          <div class="w-50 h-0.5 bg-neutral-300"></div>
          <div>ou</div>
          <div class="w-50 h-0.5 bg-neutral-300"></div>
        </div>
        <div class="flex justify-center items-center gap-5">
          <div
            class="w-10 h-10 bg-[var(--color-bgfacebok)] text-[var(--color-colorfacebok)] rounded-full flex justify-center items-center"
          >
            <i class="fa-brands fa-facebook"></i>
          </div>
          <div
            class="w-10 h-10 bg-[var(--color-bgtwitter)] text-[var(--color-colortwitter)] rounded-full flex justify-center items-center"
          >
            <i class="fa-brands fa-twitter"></i>
          </div>
          <div
            class="w-10 h-10 bg-[var(--color-bggeogle)] text-[var(--color-colorgeogle)] rounded-full flex justify-center items-center"
          >
            <i class="fa-brands fa-google text"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
