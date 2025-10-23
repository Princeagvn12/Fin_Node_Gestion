require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
const mongoose = require('mongoose')

const departmentRoutes = require('./src/routes/department.routes.js') 
const courseRoutes = require('./src/routes/course.routes.js') 


const port = process.env.PORT
 
// middleware globaux
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
 
// routes principales (api)

app.use('/api/departments', departmentRoutes)
app.use('/api/courses', courseRoutes)

mongoose.connect(process.env.MONGOOSE_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err))
 
 
app.listen(port, () => {
    console.log(`Server démaré sur le port ${port}🚀🚀`)
})

