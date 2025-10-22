import { ref } from 'vue'
import axios from 'axios'

export function useHours() {
  const loading = ref(false)
  const error = ref("")

  // Récupérer toutes les heures du formateur connecté
  async function fetchMyHours() {
    loading.value = true
    error.value = ""
    try {
      const res = await axios.get("/api/hours/me")
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      return []
    } finally {
      loading.value = false
    }
  }

  // Ajouter une saisie d'heure
  async function addHour(hour) {
    loading.value = true
    error.value = ""
    try {
      const res = await axios.post("/api/hours", hour)
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Modifier une saisie
  async function updateHour(id, hour) {
    loading.value = true
    error.value = ""
    try {
      const res = await axios.put(`/api/hours/${id}`, hour)
      return res.data.data
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Supprimer une saisie d'heure
  async function deleteHour(id) {
    loading.value = true
    error.value = ""
    try {
      await axios.delete(`/api/hours/${id}`)
      return true
    } catch (err) {
      error.value = err?.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { fetchMyHours, addHour, updateHour, deleteHour, loading, error }
}
