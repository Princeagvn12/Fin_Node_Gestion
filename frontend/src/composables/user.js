import axiosClient  from "@/api/axios";
// import { ref } from "vue";
// import router from "@/router";

export function useUser(){ 
    async function getUser(){
        const res = await axiosClient.get('/user');
        console.log(res);
        
        return res.data.users;
    }
async function createUser(data) {
  try {
    const res = await axiosClient.post('/auth/register', data);
    const user = res.data;
    console.log('✅ Utilisateur créé :', user);
    return user;
  } catch (error) {
    console.error('❌ Erreur lors de la création :', error.response?.data || error.message);
    throw error;
  }
}

    async function updateUser(data){
      const res = await axiosClient.put("/user", data);
      console.log(res);
      return res.data
    }
  async function deletUser(id) {
      const res =  await axiosClient.delete(`/user/${id}`)
      console.log(res);
      
      return res.data
    }
  async function updateStatutUser(id, statut) {
    const res = await axiosClient.patch(`/user/${id}/statut`, { statut });
    return res.data;
  }
  async function updateroleUser(id, role) {
    const res = await axiosClient.patch(`/user/${id}/role`, { role });
    return res.data;
  }

    return{
        getUser,
        createUser,
        updateUser,
        deletUser,
        updateStatutUser,
        updateroleUser
    }
}