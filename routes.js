'use strict'

module.exports = function (app) {
    const controller = require('./controller')

    // GET
    app.get('/show', controller.show);
    // POST
    app.post('/insert', controller.insert);
    // PATCH
    app.patch('/update', controller.update);
    // DELETE
    app.delete('/delete', controller.delete);
}