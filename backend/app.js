require('dotenv').config()
const express = require('express')
const corsConfig = require('./src/config/cors.js')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const app = express()
const mongoose = require('mongoose')

const departmentRoutes = require('./src/routes/department.routes.js')
const courseRoutes = require('./src/routes/course.routes.js')


const port = process.env.PORT

const connectDataBase = require('./src/config/db.js')
const authRoutes = require('./src/routes/auth.routes.js')
const coursRoutes = require('./src/routes/course.routes.js')
const hoursRoutes = require('./src/routes/hour.routes.js')
const userRoutes = require('./src/routes/user.routes.js')
connectDataBase()

// middleware globaux
app.use(corsConfig)
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

// routes principales (api)

app.use('/api/auth', authRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/courses', coursRoutes)
app.use('/api/hour', hoursRoutes)
app.use('/api/user',userRoutes)

app.listen(port, () => {
  console.log(`Server démaré sur le port ${port}🚀🚀`)
})
