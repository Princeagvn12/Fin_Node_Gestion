import axios from "axios";
import axiosClient  from "@/api/axios";

export function useAuth (){
    async function login(payload) {
        const res = await  axiosClient.post("/auth/login", {... payload})
        
    }
    async function register(payload) {
        const res = await axiosClient.post('/auth/register', { ...payload })


    }

    return {
        login,
        register,
        
    }
}