'use strict'

module.exports = function (app) {
    const controlNote = require('./control/controllerNote')
    const controller = require('./control/controller')
    const controlCategory = require('./control/controllerCategory')
    const controllerImage = require('./control/controllerImage')
    
    app.get('/mqb/*', controller.show);
    app.patch('/mqb/*', controller.update);
    app.delete('/mqb/*', controller.delete);
    app.post('/mqb/*', controller.insert);

    app.post('/upload', controllerImage.uploadImage);
    // Category
    // app.get('/category', controlCategory.show);
    // app.post('/category', controlCategory.insert);
    // app.patch('/category', controlCategory.update);
    // app.delete('/category', controlCategory.delete);
      
}