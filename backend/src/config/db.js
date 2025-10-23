const mongoose = require('mongoose')
const MONGOOSE_URI = process.env.MONGOOSE_URI

const connectDataBase = async ()=>{
    try {
       await mongoose.connect(MONGOOSE_URI);
       console.log('Connexion a la base de donnée MongoDB');
    
    } catch (error) {
        console.error('Erreur lors de la connexionn : ', error.message);
    }
}

module.exports = connectDataBase;