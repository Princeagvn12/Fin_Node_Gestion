const cors = require('cors');

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

module.exports = cors(corsOptions);