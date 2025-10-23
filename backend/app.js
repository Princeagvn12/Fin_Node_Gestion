require('dotenv').config()
const express = require('express')
const corsConfig = require('./src/config/cors.js')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT

const connectDataBase = require('./src/config/db.js')
const authRoutes = require('./src/routes/auth.routes.js')
const coursRoutes = require('./src/routes/course.routes.js')

connectDataBase()
 
// middleware globaux
app.use(corsConfig)
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
 
// routes principales (api)
app.use('/api/auth', authRoutes)
// app.use('/api/cours', coursRoutes)
// app.use('/api/departement',)
// app.use('/api/hour',)
// app.use('/api/user',)
 
app.listen(port, () => {
    console.log(`Server démaré sur le port ${port}🚀🚀`)
})
