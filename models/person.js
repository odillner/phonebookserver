const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')
const logger = require('../utils/logger')

logger.info('connecting to', config.DB_URL)

mongoose
    .connect(config.DB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.info('error connecting to MongoDB:', err.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    },
    date: Date
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.date
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)






