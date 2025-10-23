import { ref } from 'vue';
let axios;
try { axios = require('axios'); } catch (e) { axios = null; }

const MOCK_DEPARTMENTS = [
	{ _id: 'd1', name: 'Informatique', description: 'Dépt informatique' },
	{ _id: 'd2', name: 'Mathématiques', description: 'Dépt math' }
];

export function useDepartments() {
	const departments = ref([]);
	const loading = ref(false);
	const error = ref(null);

	const fetchDepartments = async () => {
		loading.value = true;
		error.value = null;
		try {
			if (axios) {
				const response = await axios.get('/departments');
				departments.value = response.data;
			} else {
				departments.value = MOCK_DEPARTMENTS;
			}
		} catch (err) {
			error.value = err.message || 'Une erreur est survenue';
			departments.value = MOCK_DEPARTMENTS;
		} finally {
			loading.value = false;
		}
	};

	return {
		departments,
		loading,
		error,
		fetchDepartments
	};
}

// import { ref } from 'vue';
// import { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } from '../api/department.api';

// export function useDepartments() {
//   const departments = ref([]);
//   const loading = ref(false);
//   const error = ref(null);

//   const fetchDepartments = async () => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await getDepartments();
//       departments.value = response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue';
//     } finally {
//       loading.value = false;
//     }
//   };

//   const fetchDepartment = async (id) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await getDepartment(id);
//       return response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue';
//     } finally {
//       loading.value = false;
//     }
//   };

//   const addDepartment = async (departmentData) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await createDepartment(departmentData);
//       departments.value.push(response.data);
//       return response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue lors de la création';
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const updateDepartmentData = async (id, departmentData) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await updateDepartment(id, departmentData);
//       const index = departments.value.findIndex(dept => dept._id === id);
//       if (index !== -1) {
//         departments.value[index] = response.data;
//       }
//       return response.data;
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue lors de la mise à jour';
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const removeDepartment = async (id) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       await deleteDepartment(id);
//       departments.value = departments.value.filter(dept => dept._id !== id);
//     } catch (err) {
//       error.value = err.message || 'Une erreur est survenue lors de la suppression';
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   return {
//     departments,
//     loading,
//     error,
//     fetchDepartments,
//     fetchDepartment,
//     addDepartment,
//     updateDepartmentData,
//     removeDepartment
//   };
// }

