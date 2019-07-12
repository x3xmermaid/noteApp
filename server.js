const express = require('express');
const app = express();
const port =   process.env.PORT || 3001; // Original 3001
const bodyParser = require('body-parser')
const routes = require('./routes');
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var allowedOrigins = ['http://localhost:8081'];
// const resolve = require('path')
// const uploader = require('./')

const favicon = require('serve-favicon');
const path = require('path');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico') ) );

app.use(cors(
//   {
//   origin: function(origin, callback){
//       console.log(origin)
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);

//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }

//     return callback(null, true);
//   },
// }
));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

routes(app);

app.listen(port);

console.log('Hihay');