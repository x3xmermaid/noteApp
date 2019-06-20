'use strict'

const con = require('../connection');
const resp = require('../response')
const sqlRows = require('./sqlData')

module.exports = {
    select: function () {  
        let sql=`SELECT d.id, title, note, time, C.category FROM data as d inner join category as C on d.id_category=C.id `
        return sql
    },
    select2: function (value) {  
        let sql=`SELECT * FROM `+ value
        return sql
    },
    update: function (value) {
        let sql=`update `+value+` SET `
        return sql
    },
    delete: function (value) {
        let sql=`delete from `+value
        return sql
    },
    insert: function (value) {
        let sql=`insert into `+value+ ` SET `
        return sql
    },
    where: function (value) { 
        let sql=` where `+ value + `= ?` 
        return sql
    },
    set: function (value) {  
        let sql = value +  ` = ? , `
        return sql;
    },
    limit: function (offset) {  
        let sql = ` limit ?, ? `
        return sql;
    },
    sorting: function (value) {  
        let sql = ` order by id `+ value
        return sql;
    },
    mergeSet: function(allSet){
        allSet = allSet.join(' ');
        allSet =  allSet.substring(0, allSet.length-2);
        return allSet;
        // console.log(allSet);
    },
    mergeSql: function(allSql ,parameter, callback){
        allSql = allSql.join(' ');
        // allSql
        con.query(allSql, parameter,
            function(error, rows, field){
                if(error){
                    throw error;
                }else{
                    callback(rows);
                    // return rows
                }
            }
        )
        // a()
        console.log(allSql);
    }
}

