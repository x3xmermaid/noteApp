const express = require('express');
const app = express();
const port = process.env.port || 3001;
const bodyParser = require('body-parser')


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.listen(port);

console.log('Hihay');