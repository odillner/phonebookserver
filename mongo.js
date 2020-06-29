const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@fullstack-1mqas.mongodb.net/test?retryWrites=true`

mongoose
    .connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const Person = mongoose.model('Person', personSchema)


if (process.argv[3] && process.argv[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        date: new Date()
    })

    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person
        .find({})
        .then(persons => {
            console.log(persons)
            mongoose.connection.close()
        })
}