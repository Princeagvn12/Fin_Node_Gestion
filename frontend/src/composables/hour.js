// src/composables/hour.js

import { ref } from 'vue'
import axios from '../api/axios.js'  // On utilise ton axios.js existant pour centraliser l'API

export function useHours() {
  const loading = ref(false)
  const error = ref("")

  // 1. Récupérer tous les cours disponibles pour le teacher (pour le select du form)
  async function fetchCourses() {
    loading.value = true
    error.value = ""
    try {
      // Endpoint à adapter si besoin, typiquement /api/courses ou /api/courses/me
      const res = await axios.get("/courses") // Peut-être /courses/me selon ton backend !
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      return []
    } finally {
      loading.value = false
    }
  }

  // 2. Récupérer toutes les heures du teacher connecté
  async function fetchMyHours() {
    loading.value = true
    error.value = ""
    try {
      const res = await axios.get("/hours/me")
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      return []
    } finally {
      loading.value = false
    }
  }

  // 3. Ajouter une nouvelle heure
  async function addHour(hour) {
    loading.value = true
    error.value = ""
    try {
      const res = await axios.post("/hours", hour)
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 4. Modifier une entrée d'heure existante
  async function updateHour(id, hour) {
    loading.value = true
    error.value = ""
    try {
      const res = await axios.put(`/hours/${id}`, hour)
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 5. Supprimer une entrée d'heure
  async function deleteHour(id) {
    loading.value = true
    error.value = ""
    try {
      await axios.delete(`/hours/${id}`)
      return true
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { fetchCourses, fetchMyHours, addHour, updateHour, deleteHour, loading, error }
}

/*
Explications :
- Ce composable regroupe toutes les fonctions nécessaires pour interagir avec les routes du backend “hours”.
- Il utilise ton fichier axios.js pour l’appel réseau.
- Il gère les erreurs et le statut loading.
- Chaque fonction retourne une donnée utilisable directement dans les composants.
*/
