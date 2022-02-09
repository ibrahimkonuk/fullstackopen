const mongoose = require('mongoose')
const uniqid = require('uniqid')

const password = process.argv[2]
const url = `mongodb+srv://ikonuk:${password}@cluster0.33zlu.mongodb.net/phonebook-app?retryWrites=true&w=majority`

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

mongoose.connect(url)

// Create schema
const contactSchema = new mongoose.Schema({
    id: String,
    name: String,
    phone: String,
})

// Create model
const Contact = mongoose.model('Contact', contactSchema)

// Get all contacts
if (process.argv.length === 3) {
    Contact.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(contact => console.log(`${contact.name}: ${contact.phone}`))
        mongoose.connection.close()
    })
}

// Save a new contact
if (process.argv.length > 3) {
    const newContact = new Contact({
        id: uniqid(),
        name: process.argv[3],
        phone: process.argv[4],
    })

    newContact.save().then(() => {
        console.log('contact saved!')
        mongoose.connect.close()
    })
}
