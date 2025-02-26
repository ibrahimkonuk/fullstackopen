require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 8,
        required: [true, 'Contact name required'],
    },
    phone: {
        type: String,
        minLength: 5,
        required: [true, 'User phone number required'],
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d{6,}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
})

// Format data 
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)