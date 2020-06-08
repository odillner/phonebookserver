const mongoose = require('mongoose')

// ### MONGODB CONNECTION ###

const password = process.env.DB_PW
const url =
  `mongodb+srv://fullstack:${password}@fullstack-1mqas.mongodb.net/test?retryWrites=true`

mongoose
  .connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date
})

const Person = mongoose.model('Person', personSchema)

// ### MONGODB CONNECTION END ###

module.exports = {
    list: (req, res) => {
        Person
        .find({})
        .then(persons => {
            res.json(persons)
            res.end()
      })
    },

    create: (req, res) => {
        const entry = req.body

        if (!Object.prototype.hasOwnProperty.call(entry, 'name')) {
            res.status(400)
            res.end("name missing")
            return
        }

        if (!Object.prototype.hasOwnProperty.call(entry, 'number')) {
            res.status(400)
            res.end("number missing")
            return
        }

        Person
        .find({ "name": entry.name })
        .then(persons => {
            if (!persons[0]) {
                const person = new Person({
                    name: entry.name,
                    number: entry.number,
                    date: new Date()
                })
            
                person
                .save()
                .then(result => {
                    res.json(entry)
                    res.end()
                })
                .catch(err => console.log(err))
            } else {
                res.status(400)
                res.end("name already exists")
            }
        })
        .catch(err => console.log(err))
    },

    read: (req, res) => {
        Person
        .find({ "_id": req.params.id })
        .then(person => {
            if (person[0]) {
                res.json(person[0])
                res.end()
            } else {
                res.status(404)
                res.end("not found")
            }
        })
        .catch(err => {
            console.log(err)
        })
    },

    update: (req, res) => {
        Person
        .findOneAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false}, function(err, entry) {
            res.json(entry);
        })
        .catch(err => {
            console.log(err)
        })
    },

    remove: (req, res) => {
        const id = req.params.id

        Person
        .remove({"_id":id})
        .then(result => {
            console.log(result)
            res.status(204).end()
        })
        .catch(err => {
            console.log(err)
        })
      

    },

    nofEntries: () => {
        return table.length;
    }
};