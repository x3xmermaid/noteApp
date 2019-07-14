'use strict'

module.exports = function (app) {
    const controlNote = require('./control/controllerNote')
    const controller = require('./control/controller')
    const controlManual = require('./control/controllerManual')
    const controllerImage = require('./control/controllerImage')
    const register = require('./control/register');
    const login = require('./control/login')
    // const multerUploads = require('./multer')
    
    app.get('/mqb/*', controller.show);
    app.patch('/mqb/*', controller.update);
    app.delete('/mqb/*', controller.delete);
    app.post('/mqb/*', controller.test);

    app.post('/manual/upload', controllerImage.uploadImage);
    app.get('/manual/cart/:id', controlManual.show)
    app.post('/manual/register', register.create); // Send Email to Register
	app.post('/manual/register_auth/:id', register.check); // Checking 6 Digit Random Number
    app.post('/manual/login', login.user); // Login Function
    app.post('/manual/login_auth/:id', login.check); // Checking 6 Digit Random Number
    // Category
    // app.get('/category', controlCategory.show);
    // app.post('/category', controlCategory.insert);
    // app.patch('/category', controlCategory.update);
    // app.delete('/category', controlCategory.delete);
      
}