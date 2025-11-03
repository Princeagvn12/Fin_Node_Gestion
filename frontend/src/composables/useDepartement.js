import axiosClient  from "@/api/axios";

export function UseDepartement(){
   async function getDepartements (){
    const res = await axiosClient.get('/departement');
    console.log(res);
    return res.data.departements;
   };

   async function createDepartement(data)  {
    try {
      const res = await axiosClient.post('/departement', data);
      const departement = res.data;
      console.log(' Département créé :', departement);
      return departement;
    } catch (error) {
      console.error(' Erreur lors de la création :', error.response?.data || error.message);
      throw error;
    }
   };

     async function getFormateursSansDepartement ()  {
    try {
      const res = await axiosClient.get('/departement/formateurs-sans-disponibles');
      console.log('Formateurs sans département :', res.data);
      return res.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des formateurs sans département :', error.response?.data || error.message);
      throw error;
    }
   };
   
 async function assignFormateurToDepartement (data)  {
    try {
      const res = await axiosClient.post('/departement/assign', data);
      console.log('Formateur assigné au département :', res.data);
      return res.data;
    } catch (error) {
      console.error('Erreur lors de l\'assignation du formateur au département :', error.response?.data || error.message);
      throw error;
    }
   };
   return{
    getDepartements,
    createDepartement,
    getFormateursSansDepartement,
    assignFormateurToDepartement
   }
}