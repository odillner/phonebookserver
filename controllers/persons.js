const Person = require('../models/person.js')

module.exports = {
    list: async (req, res, next) => {
        try {
            const persons = await Person.find({})

            res.json(persons)
            res.end()
        } catch(err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body

            const newPerson = new Person({
                name: body.name,
                number: body.number,
                date: new Date()
            })

            const result = await newPerson.save()

            res.json(result)
            res.end()

        } catch (err) {
            next(err)
        }

    },

    read: async (req, res, next) => {
        try {
            const person = await Person.findById(req.params.id)

            if (!person) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(person)
            res.end()

        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const person = await Person.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false, runValidators: true})

            if (!person) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(person)
            res.end()
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const person = await Person.findById(req.params.id)

            if (!person) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            await Person.deleteOne({'_id':req.params.id})
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    },

    nofEntries: async (req, res, next) => {
        try {
            const person = await Person.countDocuments({})

            return person
        } catch (err) {
            next(err)
        }
    }
}