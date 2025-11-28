// import { ref } from 'vue';
// let axios;
// try { axios = require('axios'); } catch (e) { axios = null; }
// import axiosClient from '@/api/axios';

// // Mock data fallback so components work even without backend
// const MOCK_USERS = [
// 	{ _id: '1', firstName: 'Jean', lastName: 'Dupont', email: 'jean@example.com', role: 'admin' },
// 	{ _id: '2', firstName: 'Nado', lastName: 'D', email: 'nado@example.com', role: 'teacher' },
// 	{ _id: '3', firstName: 'Alice', lastName: 'L', email: 'alice@example.com', role: 'student' },
// 	{ _id: '4', firstName: 'Bob', lastName: 'M', email: 'bob@example.com', role: 'student' }
// ];

// export function useUsers() {
// 	const users = ref([]);
// 	const loading = ref(false);
// 	const error = ref(null);

// 	const fetchUsers = async () => {
// 		loading.value = true;
// 		error.value = null;
// 		try {
// 			if (axios) {
// 				const response = await axios.get('/users');
// 				users.value = response.data;
// 			} else {
// 				// fallback
// 				users.value = MOCK_USERS;
// 			}
// 		} catch (err) {
// 			error.value = err.message || 'Une erreur est survenue';
// 			users.value = MOCK_USERS;
// 		} finally {
// 			loading.value = false;
// 		}
// 	};



// 	return {
// 		users,
// 		loading,
// 		error,
// 		fetchUsers
// 	};
// }

import { ref } from 'vue';
import axiosClient from '@/api/axios';

export function useUsers(){
	async function getAllUsers() {

		try {
			const res= await axiosClient.get('/user')
		return res.data
		} catch (error) {
			console.error("Erreur lors des la récupération des utilisateurs",error.message);
			
		}
	}

	async function createUser(data) {
		try {
			const res= await axiosClient.post('/user',data)
			if(res.data){

				return res.data
			}

		} catch (error) {
			console.error("Erreur lors de la création de l'utilisateur",error.message);
			
		}
	}

	async function updateUser(data) {
		try {
			const res= await axiosClient.put(`/user`,data)
			if(res.data){
				return res.data
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'utilisateur",error.message);
			
		}
	}

	async function deleteUser(id) {
		try {
			const res= await axiosClient.delete(`/user/${id}`)
			if(res.data){
				return res.data
			}
		} catch (error) {
			console.error("Erreur lors de la suppression de l'utilisateur",error.message);
			
		}
	}

	return {
		getAllUsers,
		createUser,
		updateUser,
		deleteUser
	}
}


// import { getUsers, getUser, createUser, updateUser, deleteUser } from '../api/user.api';

// export function useUsers() {
//   const users = ref([]);
//   const loading = ref(false);
//   const error = ref(null);

//   const fetchUsers = async () => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await getUsers();
//       users.value = response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue';
//     } finally {
//       loading.value = false;
//     }
//   };

//   const fetchUser = async (id) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await getUser(id);
//       return response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue';
//     } finally {
//       loading.value = false;
//     }
//   };

//   const addUser = async (userData) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await createUser(userData);
//       users.value.push(response.data);
//       return response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue lors de la création';
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const updateUserData = async (id, userData) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await updateUser(id, userData);
//       const index = users.value.findIndex(user => user._id === id);
//       if (index !== -1) {
//         users.value[index] = response.data;
//       }
//       return response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue lors de la mise à jour';
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const removeUser = async (id) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       await deleteUser(id);
//       users.value = users.value.filter(user => user._id !== id);
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue lors de la suppression';
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   return {
//     users,
//     loading,
//     error,
//     fetchUsers,
//     fetchUser,
//     addUser,
//     updateUserData,
//     removeUser
//   };
// }
