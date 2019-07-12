'use strict'

module.exports = function (app) {
    const controlNote = require('./control/controllerNote')
    const controller = require('./control/controller')
    const controlManual = require('./control/controllerManual')
    const controllerImage = require('./control/controllerImage')
    // const multerUploads = require('./multer')
    
    app.get('/mqb/*', controller.show);
    app.patch('/mqb/*', controller.update);
    app.delete('/mqb/*', controller.delete);
    app.post('/mqb/*', controller.insert);

    app.post('/manual/upload', controllerImage.uploadImage);
    app.get('/manual/cart', controlManual.show)
    // Category
    // app.get('/category', controlCategory.show);
    // app.post('/category', controlCategory.insert);
    // app.patch('/category', controlCategory.update);
    // app.delete('/category', controlCategory.delete);
      
}