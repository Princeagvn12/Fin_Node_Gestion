import axiosClient  from "@/api/axios";
import { ref } from "vue";
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
            console.log(user.value)
            isAuthenticated.value = true
            
         } catch (error) {
             user.value = null
            isAuthenticated.value = false
        }
    }

    return {
        login,
        register,
        fetchUser,
        user,
        isAuthenticated
    }
}