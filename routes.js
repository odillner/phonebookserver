module.exports = (app) => {
    const persons = require('./services/persons');
    const info = require('./pages/Info');

    app.route('/api/persons')
        .get(persons.list)
        .post(persons.create);

    app.route('/info')
        .get(info)

    app.route('/api/persons/:id')
        .get(persons.read)
        .put(persons.update)
        .delete(persons.remove);
};
