'use strict'

module.exports = function (app) {
    const controlNote = require('./control/controllerNote')
    const controlCategory = require('./control/controllerCategory')

    // GET
    // app.get('/show/:id', function(req, res, next){
    //     if(req.params.id === '1'){
    //         app.get('/show/0', controller.show);
    //     }
    //     next();
    // }, function(req, res, next){
    //         // next(controller.show);
    //     console.log('aaaa');
    //     next();
    // })
    // NOTE
    // GET
    app.get('/note', controlNote.show);
    // POST
    app.post('/note', controlNote.insert);
    // PATCH
    app.patch('/note', controlNote.update);
    // DELETE
    app.delete('/note', controlNote.delete);
    
    // Category
    // GET
    app.get('/category', controlCategory.show);
    // POST
    app.post('/category', controlCategory.insert);
    // PATCH
    app.patch('/category', controlCategory.update);
    // DELETE
    app.delete('/category', controlCategory.delete);
}