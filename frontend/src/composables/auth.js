import axiosClient  from "@/api/axios";
import { ref } from "vue";
import router from "@/router";


const user = ref(null)
const isAuthenticated = ref(false)

export function useAuth (){
    async function login(payload) {
        const res = await  axiosClient.post("/auth/login", {... payload}, { withCredentials: true })
    }
    async function register(payload) {
        const res = await axiosClient.post('/auth/register', { ...payload })
        const user  = res.data
        console.log(user)
        
        return user
    }
    
   async function fetchUser() {
        try {
            const res =  await axiosClient.get('/auth/me', { withCredentials: true })
            user.value = res.data.user
            isAuthenticated.value = true
            console.log(user.value);
         } catch {
            try {
                await axios.post('/auth/refresh', null, { withCredentials: true })
                const res = await axiosClient.post('/me', { withCredentials: true })
                user.value = res.data.user
                isAuthenticated.value = true
            } catch {
                user.value = null
               isAuthenticated.value = false
            }
        }
    }

    async function logout() {
        try {
            const res = await axiosClient.post('/auth/logout', { withCredentials: true })
            user.value= null
            isAuthenticated.value = false
            router.push('/login')
        } catch (error) {
            console.error("Erreur de déconnexion :", error)
        }
    }

    return {
        login,
        register,
        fetchUser,
        logout,
        user,
        isAuthenticated
    }
}