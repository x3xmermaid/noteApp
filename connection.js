const mysql = require('mysql');
require('dotenv').config()
// const dotEn = require('dotenv');

const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "a2JUWyZwY9",
    password: "6q1FkkdpSB",
    database: "a2JUWyZwY9",
})

con.connect(function(error){
    if(error) throw error;
})

module.exports = con;