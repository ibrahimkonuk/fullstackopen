const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('build'))

// app.use(morgan('tiny'))
morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "phone": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "phone": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "phone": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('Phonebook app')
})

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {

    let id = Number(request.params.id)
    const contact = phonebook.filter(c => c.id === id)
    if (contact.length) {
        response.json(contact)
    } else {
        response.status(404).json({
            error: 'contact not found'
        }).end()
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
    let id = Number(request.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)
    response.status(204).end()
})

app.post('/api/phonebook', (request, response) => {

    let duplicate = phonebook
        .some(c =>
            c.name.toLowerCase() === request.body.name.trim().toLowerCase())

    if (duplicate)
        response.status(409).json({ error: 'contact already exists' })

    if (!request.body.name || !request.body.phone)
        response.status(400).json({ error: 'empty parameter' }).end()

    const contact = {
        ...request.body,
        'id': Math.floor(Math.random() * 1000)
    }
    phonebook.concat(contact)
    response.json(contact)
})

app.get('/api/info', (request, response) => {
    let num = phonebook.length
    let now = new Date()
    response.send(`Phonebook has info for ${num} people. \n\n${now}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on port ${PORT}`)