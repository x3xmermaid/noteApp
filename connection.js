const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noteApp',
})

con.connect(function(error){
    if(error) throw error;
})

module.exports = con;