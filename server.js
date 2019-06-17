const express = require('express');
const app = express();
const port = process.env.port || 3001;
const bodyParser = require('body-parser')
const routes = require('./routes');

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

routes(app);

app.listen(port);

console.log('Hihay');