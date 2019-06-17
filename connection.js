const mysql = require('mysql');
require('dotenv').config()
// const dotEn = require('dotenv');

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

con.connect(function(error){
    if(error) throw error;
})

module.exports = con;