'use strict'

module.exports = function (app) {
    const controlNote = require('./control/controllerNote')
    const controller = require('./control/controller')
    const controlCategory = require('./control/controllerCategory')
    
    app.get('*', controller.test);
    app.patch('*', controller.update);
    app.delete('*', controller.delete);
    app.post('*', controller.insert);
    // Category
    // app.get('/category', controlCategory.show);
    // app.post('/category', controlCategory.insert);
    // app.patch('/category', controlCategory.update);
    // app.delete('/category', controlCategory.delete);
}