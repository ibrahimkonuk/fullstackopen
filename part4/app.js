const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./controllers/posts')
const middleware = require('./utils/middleware')
require('express-async-errors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/users', usersRouter)
app.use('/api/blog', router)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app