const DB = require('../db.json');
let table = DB.persons;


const nameExists = (name) => {
    const entry = table.find(entry => entry.name === name);

    if (entry) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    list: (req, res) => {
        res.send(table);
    },

    create: (req, res) => {
        const entry = req.body;
        if (Object.prototype.hasOwnProperty.call(entry, 'name')) {
            if (Object.prototype.hasOwnProperty.call(entry, 'number')) {
                if (nameExists(entry.name)) {
                    res.status(400);
                    res.end("name already exists")
                } else {
                    entry.id = Math.floor(Math.random() * Math.floor(10000))

                    table = table.concat(entry);
            
                    res.json(entry);
                }
            } else {
                res.status(400);
                res.end("number missing")
            }
        } else {
            res.status(400);
            res.end("name missing")
        }
    },

    read: (req, res) => {
        const id = Number(req.params.id);
        const entry = table.find(entry => entry.id === id);

        if (entry) {
            res.json(entry);
        } else {
            res.status(404).end();
        }
    },

    update: (req, res) => {
        DB.findOneAndUpdate({_id: req.params.entryId}, req.body, {new: true}, function(err, entry) {
            if (err)
            res.send(err);
            res.json(entry);
        });
    },

    remove: (req, res) => {
        const id = Number(req.params.id)
        table = table.filter(entry => entry.id !== id)
      
        res.status(204).end()
    },

    nofEntries: () => {
        return table.length;
    }
};