const persons = require('../controllers/persons')

module.exports = async (req, res) => {
    const result = await persons.nofEntries()

    res.send(
        `Phonebook has ${result} entries <br>` + new Date()
    )
}

