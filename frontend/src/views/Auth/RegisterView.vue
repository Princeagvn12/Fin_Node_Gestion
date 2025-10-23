<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { register } = useAuth();
const error = ref(null);

const form = ref({
  email: "",
  name: "",
  password: "",
});

const handleRegister = async () => {
  error.value = null;
  try {
    await register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });
    router.push({ name: "login" });
  } catch (e) {
    error.value = e.response?.data?.message || "Erreur lors de l'inscription";
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center">
    <div class="hidden lg:block lg:w-1/2 xl:w-3/5">
      <img src="/auth-img2.png" alt="Inscription" class="w-120 object-cover" />
    </div>
    <div
      class="w-full lg:w-1/2 xl:w-2/5 h-screen bg-[var(--color-background)] px-8 sm:px-16 md:px-24 lg:px-16 xl:px-24 py-12"
    >
      <div class="mb-8">
        <div class="text-[var(--color-linkb)] text-4xl font-bold text-center">
          <i class="fa-solid fa-graduation-cap"></i>
          EduTrack RH
        </div>
      </div>
      <div>
        <h1 class="font-medium text-3xl pb-2">L'aventure commence ici !</h1>
        <p>Inscrivez-vous pour commencer à gérer votre parcours.</p>
        <!-- <p>Veuillez vous inscrire à votre compte et commencer l'aventure</p> -->
        <div>
          <form @submit.prevent="handleRegister">
            <div>
              <h2 class="mb-2 mt-8 font-semibold">Nom d'utilisateur</h2>
              <div
                class="p-2 border-neutral-300 rounded-[8px] flex border items-center gap-2.5"
              >
                <i class="fa-regular fa-user"></i>
                <input
                  class="w-full border-none outline-none"
                  v-model="form.name"
                  type="text"
                  placeholder="Entrez votre nom d'utilisateur"
                  autocomplete="name"
                  required
                />
              </div>
            </div>
            <div>
              <h2 class="mb-2 mt-8 font-semibold">Adresse E-mail</h2>
              <div
                class="p-2 border-neutral-300 rounded-[8px] flex border items-center gap-2.5"
              >
                <i class="fa-regular fa-envelope"></i>
                <input
                  class="w-full border-none outline-none"
                  v-model="form.email"
                  type="email"
                  placeholder="exemple@email.com"
                  autocomplete="email"
                  required
                />
              </div>
            </div>
            <div class="mt-5">
              <h2 class="mb-2 font-semibold">Mot de passe</h2>

              <div
                class="rounded-lg p-2 flex border border-neutral-300 items-center gap-2.5"
              >
                <i class="fa-solid fa-lock"></i>
                <input
                  class="w-full border-none outline-none"
                  v-model="form.password"
                  type="password"
                  placeholder="Entrez le mot de passe actuel"
                  required
                  autocomplete="new-password"
                />
                <i class="fa-solid fa-eye-slash cursor-pointer"></i>
              </div>
            </div>
            <!-- <div class="mt-5">
              <h2 class="mb-2 font-semibold">Confirmer le mot de passe</h2>
              <div
                class="rounded-lg p-2 flex border border-neutral-300 items-center gap-2.5"
              >
                <i class="fa-solid fa-lock"></i>
                <input
                  class="w-full border-none outline-none"
                  v-model="form.password_confirmation"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  required
                  autocomplete="new-password"
                />
                <i class="fa-solid fa-eye-slash cursor-pointer"></i>
              </div>
            </div> -->
            <div class="flex items-center mt-5">
              <input type="checkbox" id="terms" required /><label
                for="terms"
                class="ml-2 font-semibold text-sm"
                >J'accepte les
                <a href="#" class="text-[var(--color-linkbtn)]"
                  >conditions d'utilisation</a
                ></label
              >
            </div>
            <input
              type="submit"
              value="S'inscrire"
              class="w-full font-semibold text-center py-3 text-[var(--color-background)] my-8 rounded-lg bg-[var(--color-linkbtn)] cursor-pointer"
            />
          </form>
          <div class="text-center mb-12">
            Vous avez déjà un compte?
            <router-link to="/login" class="text-[var(--color-linkbtn)] font-semibold"
              >Se connecter</router-link
            >
          </div>
        </div>
        <div class="flex items-center mb-12">
          <div class="flex-grow h-px bg-neutral-300"></div>
          <div class="px-4">ou</div>
          <div class="flex-grow h-px bg-neutral-300"></div>
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
