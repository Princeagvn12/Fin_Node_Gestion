<script setup>


</script>


<template>


<div>
<form class="max-w-md mx-auto p-6 bg-white rounded shadow-md">
  <div class="mb-4">
    <label for="title" class="block text-gray-700 font-bold mb-2">Titre :</label>
    <input type="text" id="title" name="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
  </div>

  <div class="mb-4">
    <label for="code" class="block text-gray-700 font-bold mb-2">Code :</label>
    <input type="text" id="code" name="code" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
  </div>

  <div class="mb-4">
    <label for="description" class="block text-gray-700 font-bold mb-2">Description :</label>
    <textarea id="description" name="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
  </div>

  <div class="mb-4">
    <label for="departement" class="block text-gray-700 font-bold mb-2">Département :</label>
    <select id="departement" name="departement" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      <option value="">-- Sélectionnez un département --</option>
      <option value="departement1">Département 1</option>
      <option value="departement2">Département 2</option>
      <!-- Ajoutez d'autres options selon vos besoins -->
    </select>
  </div>

  <div class="mb-4">
    <label for="mainTeacher" class="block text-gray-700 font-bold mb-2">Formateur principal :</label>
    <select id="mainTeacher" name="mainTeacher" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      <option value="">-- Sélectionnez un enseignant --</option>
      <option value="enseignant1">Enseignant 1</option>
      <option value="enseignant2">Enseignant 2</option>
      <!-- Ajoutez d'autres options selon vos besoins -->
    </select>
  </div>

  <div class="mb-4">
    <label for="students" class=" text-gray-700 font-bold mb-2">Etudiants :</label>
    <select id="students" name="students" multiple class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      <option value="">-- Sélectionnez des étudiants --</option>
      <option value="etudiant1">Étudiant 1</option>
      <option value="etudiant2">Étudiant 2</option>
      <!-- Ajoutez d'autres options selon vos besoins -->
    </select>
  </div>

  <input type="submit" value="Envoyer"
           class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
</form>
</div>



</template>


<style scoped>


</style>