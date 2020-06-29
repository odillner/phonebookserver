const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.DB_URL

console.log('connecting to', url)

mongoose
    .connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('error connecting to MongoDB:', err.message))

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






