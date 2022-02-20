const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./controllers/blogs')
const middleware = require('./utils/middleware')
require('express-async-errors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/blog', router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app