import { ref } from 'vue'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../api/user.api'

export function useUsers() {
	const users = ref([])
	const loading = ref(false)
	const error = ref(null)

	const fetchUsers = async (params = {}) => {
		loading.value = true
		error.value = null
		try {
			const response = await getUsers(params)
			users.value = response.data
		} catch (err) {
			error.value = err.response?.data?.message || err.message || 'Une erreur est survenue'
		} finally {
			loading.value = false
		}
	}

	const fetchUser = async (id) => {
		loading.value = true
		error.value = null
		try {
			const response = await getUser(id)
			return response.data
		} catch (err) {
			error.value = err.response?.data?.message || err.message || 'Une erreur est survenue'
		} finally {
			loading.value = false
		}
	}

	const addUser = async (userData) => {
		loading.value = true
		error.value = null
		try {
			const response = await createUser(userData)
			users.value.push(response.data)
			return response.data
		} catch (err) {
			error.value = err.response?.data?.message || err.message || 'Erreur lors de la création'
			throw err
		} finally {
			loading.value = false
		}
	}

	const updateUserData = async (id, userData) => {
		loading.value = true
		error.value = null
		try {
			const response = await updateUser(id, userData)
			const index = users.value.findIndex((u) => u._id === id)
			if (index !== -1) users.value[index] = response.data
			return response.data
		} catch (err) {
			error.value = err.response?.data?.message || err.message || 'Erreur lors de la mise à jour'
			throw err
		} finally {
			loading.value = false
		}
	}

	const removeUser = async (id) => {
		loading.value = true
		error.value = null
		try {
			await deleteUser(id)
			users.value = users.value.filter((u) => u._id !== id)
		} catch (err) {
			error.value = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
			throw err
		} finally {
			loading.value = false
		}
	}

	return { users, loading, error, fetchUsers, fetchUser, addUser, updateUserData, removeUser }
}
