'use strict'

require('dotenv').config()

const con = require('../connection');
const resp = require('../response')
const model = require('./modelNote');
// const count = 3

exports.insert = function(req, res){
    let table = req.path;
    let allSql = [model.insert(table.substring(1)),'','',''];
    let parameter = [];
    let allSet = [];

    for (const key in req.body) {
        allSet.push(model.set(``+key))
        parameter.push(req.body[key]) 
    }

    allSql.push(model.mergeSet(allSet));
    model.mergeSql(allSql, parameter, function(a){
        res.send(a);
    });
}

exports.update = function(req, res){
    let sqlID = ``;
    let parameter = [];
    let allSet = [];
    // parameter.push(req.body.title) 
    let allSql =[model.update()];
    // console.log(req.body.note)
    for (const key in req.body) {
        allSet.push(model.set(``+key))
        // console.log(parameter)
        parameter.push(req.body[key]) 
    }
    
    allSql.push(model.mergeSet(allSet));

    if((req.query.id)){      
        allSql.push(model.where(`id`))
        parameter.push(req.query.id) 
    }
            
    // console.log(allSql)
    // console.log(parameter)
    // console.log(model.mergeSet(allSet))
    model.mergeSql(allSql, parameter, function(a){
        // ca
        // console.log(a.length);
        res.send(a);
    });
    
}

exports.delete = function(req, res){
    if(req.query.id){
        con.query(
            `DELETE FROM data where id=?`,
            [req.query.id],
            function (error, rows, field){
                if (error){
                    throw error;
                }else{
                    return res.send(resp.deleteTrue(rows, res))
                }
            }
        )
    }else{
        res.send("silahkan masukkan query dengan parameter id untuk menghapus data");
    }
    // next()
}

exports.show = function(req, res){
    let table = req.path;
    // console.log(table.length)
    let allSql = [model.select2(table.substring(1)),'','',''];
    let parameter = [];

    if((req.query.title)){ 
        allSql.splice(1, 1, model.where())
        parameter.push(req.query.title)  
    }
    
    if((req.query.sorting)){
        allSql.splice(2, 1, model.sorting(req.query.sorting))
        // parameter.push(``+)   
    }

    if((req.query.page)){
        if(!(req.query.count)){
            req.query.count = process.env.COUNT;
        }
        let offset = (req.query.page - 1) * req.query.count;
        let count = parseInt(req.query.count, 10);
        allSql.splice(3, 1, model.limit())
        parameter.push(offset, count) ; 

    }
    // let sql = 
    model.mergeSql(allSql, parameter, function(a){
        // ca
        // console.log(a.length);
        res.send(a);
    });
    // res.send(sql);
}