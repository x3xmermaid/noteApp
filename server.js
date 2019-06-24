const express = require('express');
const app = express();
const port = process.env.port || 3001;
const bodyParser = require('body-parser')
const routes = require('./routes');
const cors = require('cors');

var allowedOrigins = ['http://192.168.6.119'];

app.use(cors({
  origin: function(origin, callback){
      console.log(origin)
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: false,
}));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

routes(app);

app.listen(port);

console.log('Hihay');