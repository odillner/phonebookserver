const persons = require('./services/persons')
const info = require('./pages/Info')

module.exports = (app) => {
    app.route('/api/persons')
        .get(persons.list)
        .post(persons.create)

    app.route('/info')
        .get(info)

    app.route('/api/persons/:id')
        .get(persons.read)
        .put(persons.update)
        .delete(persons.remove)
}
