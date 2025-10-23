<script setup>


</script>


<template>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
    <h1 class="text-center font-semibold">Historique des Connexions Récentes</h1>

    <div class="p-4 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-4 py-3">Jean Dupont</td>
                    <td class="px-4 py-3">Administrateur</td>
                    <td class="px-4 py-3">Il y a 2 heures</td>
                </tr>
                <tr>
                    <td class="px-4 py-3">Nado</td>
                    <td class="px-4 py-3">Formateur</td>
                    <td class="px-4 py-3">Il y a 1 heure</td>
                </tr>
                <tr>
                    <td class="px-4 py-3">John Doe</td>
                    <td class="px-4 py-3">Etudiant</td>
                    <td class="px-4 py-3">Il y a 5 min</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</template>


<style scoped>


</style>