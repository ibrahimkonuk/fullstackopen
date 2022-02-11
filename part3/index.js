const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./models/contact')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('build'))

// app.use(morgan('tiny'))
morgan.token('body', (request,) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

app.get('/', (request, response) => {
    response.send('Phonebook app')
})

app.get('/api/phonebook', (request, response, next) => {
    Contact.find({})
        .then((notes) => {
            notes
                ? response.json(notes)
                : response.status(404)
        })
        .catch((error) => next(error))
})

app.get('/api/phonebook/:id', (request, response, next) => {
    Contact.find({ _id: request.params.id })
        .then((contact) => {
            contact
                ? response.json(contact)
                : response.status(404)
        })
        .catch((error) => next(error))
})

app.delete('/api/phonebook/:id', (request, response, next) => {
    Contact.findByIdAndRemove({ _id: request.params.id })
        .then(() => {
            response.status(200).send({ success: 'contact deleted' })
        })
        .catch((error) => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
    Contact.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((updatedNote) => {
            updatedNote
                ? response.json(updatedNote)
                : response.status(404)
        })
        .catch((error) => next(error))
})

app.post('/api/phonebook', (request, response, next) => {
    let body = request.body

    if (!body.name || !body.phone)
        response.status(400).send({ error: 'empty parameter' })

    Contact.exists({ name: body.name })
        .then((contact) => {
            if (contact) {
                response.status(409).json({ error: 'contact already exists' })
            } else {
                Contact.create(body)
                    .then(contact => response.json(contact))
                    .catch((error) => response.status(500).json(error.message))
            }
        })
        .catch((error) => next(error))
})

app.get('/api/info', (request, response, next) => {
    let now = new Date()
    Contact.countDocuments()
        .then(numOfContacts => response.send(`Phonebook has info for ${numOfContacts} people. \n\n${now}`))
        .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})