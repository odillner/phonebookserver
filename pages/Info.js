const dbhandler = require('../controllers/DBHandler');

module.exports = (req, res) => {
    n = dbhandler.nofEntries();
    res.send(
        `Phonebook has ${n} entries <br>` + new Date()
    );
}

