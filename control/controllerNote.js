'use strict'

require('dotenv').config()

const con = require('../connection');
const resp = require('../response')
// const count = 3

exports.show = function(req, res, next){
    let sql = `SELECT d.id, title, note, time, C.category FROM data as d inner join category as C on d.id_category=C.id`
    let parameter =[];
    let sqlPage = ``
    let parameterPage = [];
    let sqlTitle = ``
    let parameterTitle = [] 
    let sqlSort = ``
    let parameterSort = []

    if((req.query.page)){
        if(!(req.query.count)){
            req.query.count = process.env.COUNT;
        }
        let offset = (req.query.page - 1) * req.query.count;
        let count = parseInt(req.query.count, 10);
        sqlPage = `limit ?, ?`
        parameterPage = [offset, count]  
    }

    if((req.query.title)){
        sqlTitle = `where title=?`
        parameterTitle = [req.query.title]       
    }

    if((req.query.sorting)){
        if(req.query.sorting === 'desc'){
            sqlSort = `order by id DESC`
        }else
            sqlSort = `order by id ASC`  
    }

    let allSql = [sql, sqlTitle , sqlSort, sqlPage];
    allSql = allSql.join(' ');
    // console.log(allSql)
    Array.prototype.push.apply(parameter, parameterTitle);
    // Array.prototype.push.apply(parameter, parameterSort);
    Array.prototype.push.apply(parameter, parameterPage);
    con.query(allSql, parameter , 
            function(error, rows, field){
                if(error){
                    throw error;
                }else{
                    res.json(rows);
                    res.end;
                }
            }
    )
}

exports.insert = function(req, res){
    let Title = req.body.title;
    let Note = req.body.note;
    let ID_category = req.body.idCategory;
    con.query(
        `INSERT INTO data SET title=?, note=?, time=now(), id_category=?`,
        [Title, Note, ID_category],
        function (error, rows, field) {
            if(error){
                throw error;
            }else{
                return res.send(resp.insertTrue(rows, res))
            }
        }
    )
    // next()
}

exports.update = function(req, res){
    let sql = `UPDATE data SET `
    let sqlID = ``;
    let parameter = [];
    let allSql =[];

    if(req.body.title){
        allSql.push(`title = ?`)
        parameter.push(req.body.title) 
    }
    if(req.body.note){
        allSql.push(`note = ?`)
        parameter.push(req.body.note) 
    }
    if(req.body.idCategory){
        allSql.push(`id_category = ?`)
        parameter.push(req.body.idCategory) 
    }
    if(req.query.id){
        sqlID = ` where id = ?`;
        parameter.push(req.query.id) 
    }
    for(let i=0; i < allSql.length;i++){
        if(i === allSql.length-1){
            sql = sql.concat(allSql[i]);
        }else{
            sql = sql.concat(allSql[i], ', ');
        }
    }
    sql =  sql.concat(sqlID);
    con.query(sql, parameter,
        function (error, rows, field) {
            if(error){
                throw error;
            }else{
                return res.send(resp.insertTrue(rows, res))
            }
        }
    )
}

exports.delete = function(req, res){
    let Id = req.body.id;
    con.query(
        `DELETE FROM data where id=?`,
        [Id],
        function (error, rows, field){
            if (error){
                throw error;
            }else{
                return res.send(resp.deleteTrue(rows, res))
            }
        }
    )
    // next()
}