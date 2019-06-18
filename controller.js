'use strict'

const con = require('./connection');
const resp = require('./response')

exports.show = function(req, res, next){
    con.query(
        `SELECT * FROM data`,
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

exports.insert = function(req, res, next){
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
}

exports.update = function(req, res, next){
    let Title = req.body.title;
    let Note = req.body.note;
    let ID_category = req.body.idCategory;
    let Id = req.body.id;
    con.query(
        `UPDATE data SET title=?, note=?, id_category=? where id=?`,
        [Title, Note, ID_category, Id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send(resp.updateTrue(rows, res))
            }
        }
    )
}

exports.delete = function(req, res, next){
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
}