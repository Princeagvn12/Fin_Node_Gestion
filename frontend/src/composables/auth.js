import axiosClient  from "@/api/axios";
import { ref } from "vue";
import router from "@/router";


const user = ref(null)
const isAuthenticated = ref(false)

export function useAuth (){
    async function login(payload) {
        await axiosClient.post("/auth/login", { ...payload })
        await fetchUser()
    }
    async function register(payload) {
        const res = await axiosClient.post('/auth/register', { ...payload })
        const user  = res.data
        console.log(user)
        
        return user
    }
    
   async function fetchUser() {
        try {
            const res = await axiosClient.get('/auth/me')
            user.value = res.data.user
            isAuthenticated.value = true
            return user.value
         } catch {
            try {
                await axiosClient.post('/auth/refresh')
                const res = await axiosClient.get('/auth/me')
                user.value = res.data.user
                isAuthenticated.value = true
                return user.value
            } catch {
                user.value = null
               isAuthenticated.value = false
               return null
            }
        }
    }

    async function logout() {
        try {
            await axiosClient.post('/auth/logout')
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
