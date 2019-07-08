'use strict'

const con = require('../connection');
const resp = require('../response')
const sqlRows = require('./sqlData')

module.exports = {
    select2: function (value) {  
        let sql=`SELECT * FROM `+value
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
    iJoin: function (table, table2, field1, field2 ){
        let sql=`left join `+table2+` on `+table+`.`+field1+`=`+table2+`.`+field2
        return sql
    },
    where: function (value) { 
        let sql=` where `+ value + `= ?` 
        return sql
    },
    where2: function (value, value2) { 
        let sql=` where `+ value + ` is null`
        return sql
    },
    search: function (value, value2) {
        let sql=` where `+ value + ` like '%`+value2+`%'` 
        return sql
    },
    set: function (value) {  
        let sql = value +  ` = ? , `
        return sql;
    },
    timeNow: function (value) {  	
        let sql = value +  ` = now( ) , `
        return sql;
    },
    limit: function (offset) {  
        let sql = ` limit ?, ? `
        return sql;
    },
    sorting: function (by, value) {  
        let sql = ` order by `+by+` `+ value
        return sql;
    },
    mergeSet: function(allSet){
        allSet = allSet.join(' ');
        allSet =  allSet.substring(0, allSet.length-2);
        return allSet;
        // console.log(allSet);
    },
    and: function(value, value2){
        let sql = ` and `+value+` = ? `
        return sql
    } ,
    and2: function(value, value2){
        let sql = ` and `+value+` is null`
        return sql
    } ,
    mergeSql: function(allSql ,parameter, paging, callback){
        allSql = allSql.join(' ');
        // allSql
        console.log(parameter)
        con.query(allSql, parameter,
            function(error, rows, field){
                if(error){
                    console.log(error) 
                }else{
                    
                    // console.log(field)
                    callback(rows, parameter, paging);
                    // return rows
                }
            }
        )
        // a()
        console.log(allSql);
    }
}

