const mongoose = require('mongoose')
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

            const persons = await Person.find({"name": body.name})

            if (!persons[0]) {
                const newPerson = new Person({
                    name: body.name,
                    number: body.number,
                    date: new Date()
                })
            
                const result = await newPerson.save()

                res.json(result)
                res.end()
            } else {
                res.status(400).send({error: "name already exists"})
            }
        } catch (err) {
            next(err)
        }
        
    },

    read: async (req, res, next) => {
        try {
            const person = await Person.findById(req.params.id)

            if (person) {
                res.json(person)
                res.end()
            } else {
                res.status(404).send({error: "person doesnt exist"})
            }
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const person = await Person.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false})

            if (person) {
                res.json(person)
                res.end()
            } else {
                res.status(404).send({error: "person doesnt exist"})
            }
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const result = await Person.deleteOne({"_id":req.params.id})
            res.status(204).end()
        } catch (err) {
            next(err)
        }

    },

    nofEntries: () => {
        return new Promise(resolve => {
            Person
            .countDocuments({})
            .then(result => {
                resolve(result)
            })
        })
    }
};