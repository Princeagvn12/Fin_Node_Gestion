<script setup>
import departmentComponent from '@/components/admin/departmentComponent.vue';
import usersComponent from '@/components/admin/usersComponent.vue';
import Historique from '@/components/admin/Historique.vue';
import RepatitionUtilisateurs from '@/components/admin/RepatitionUtilisateurs.vue';
import CoursComponent from '@/components/admin/CoursComponent.vue';
</script>



 <template>
  <div class="flex dark:bg-gray-900 transition-colors duration-300">
    <!--  Sidebar (optionnelle, à gauche) -->
    <!-- <Sidebar class="w-64 bg-gray-100 dark:bg-gray-800 hidden lg:block" /> -->

    <!--  Contenu principal -->
    <div class="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">

      <!-- Ligne 1 : Users, Department, Cours -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <usersComponent class="dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl w-70 transition-all duration-300" />
        <departmentComponent class=" w-70 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all lg:-ml-40 duration-300" />
        <CoursComponent class="dark:bg-gray-800 rounded-xl  transition-all duration-300 lg:-ml-60"  />
      </div>

      <!-- Ligne 2 : Historique et Répartition utilisateurs -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
      >
        <Historique class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300" />
        <RepatitionUtilisateurs class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300" />
      </div>

    </div>
  </div>
</template>





<style scoped>
/* 💡 Pour adoucir les transitions du mode clair/sombre */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>