module.exports = (app) => {
    const dbhandler = require('./controllers/DBHandler');
    const info = require('./pages/Info');

    app.route('/api/persons')
        .get(dbhandler.list)
        .post(dbhandler.create);

    app.route('/info')
        .get(info)

    app.route('/api/persons/:id')
        .get(dbhandler.read)
        .put(dbhandler.update)
        .delete(dbhandler.remove);
};
