const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title required'],
    },
    author: {
        type: String,
        required: [true, 'Author name required'],
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
    },
    likes: {
        type: Number,
        required: false,
        default: 0,
    },
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Post', postSchema)