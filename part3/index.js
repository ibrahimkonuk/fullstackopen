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
morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

app.get('/', (request, response) => {
    response.send('Phonebook app')
})

app.get('/api/phonebook', (request, response) => {
    Contact.find({})
        .then(notes => {
            response.json(notes)
        })
        .catch(() => {
            response.status(204).json({ message: "phonebook is empty" })
        })
})

app.get('/api/phonebook/:id', (request, response) => {
    Contact.find({ _id: request.params.id })
        .then((contact) => {
            response.json(contact)
        })
})

app.delete('/api/phonebook/:id', (request, response) => {
    Contact.findByIdAndRemove({ _id: request.params.id })
        .then(() => {
            response.status(200).json({ success: 'contact deleted' })
        })
        .catch(() => response.status(500).json({ error: "couldn't delete" }))
})

app.post('/api/phonebook', (request, response) => {
    let body = request.body

    if (!body.name || !body.phone)
        response.status(400).json({ error: 'empty parameter' })

    Contact.exists({ phone: body.phone })
        .then((contact) => {
            if (contact) {
                response.status(409).json({ error: 'phone number already exists' })
            } else {
                Contact.create(body)
                response.status(200).json(body);
            }
        })
})

app.get('/api/info', (request, response) => {
    let now = new Date()
    Contact.countDocuments()
        .then(numOfContacts => response.send(`Phonebook has info for ${numOfContacts} people. \n\n${now}`))
        .catch(() => response.status(500).json({ error: "couldn't get info" }))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})