require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
const port = process.env.PORT

const coursesRoutes = require('./src/')
const hoursRoutes = require('./routes/hours.routes')
 
// middleware globaux
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
 
// routes principales (api)
app.use('api/courses', )
app.use('api/hours', )
 
app.listen(port, () => {
    console.log(`Server démaré sur le port ${port}🚀🚀`)
})