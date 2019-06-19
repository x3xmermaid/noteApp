'use strict'

const con = require('../connection');
const resp = require('../response')

exports.show = function(req, res){
    if(!(req,query.id)){
        con.query(
                `SELECT * FROM category`,
                function(error, rows, field){
                    if(error){
                        throw error;
                    }else{
                        res.json(rows);
                        res.end;
                    }
                }
        )
    }else{
        con.query(
                `SELECT * FROM category where id=?`,
                [req.query.id],
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
        // next();
}

exports.insert = function(req, res){
    let Category = req.body.category;
    con.query(
        `INSERT INTO category SET category=?`,
        [Category],
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
    let Category = req.body.category;
    let Id = req.body.id;
    con.query(
        `UPDATE data SET category=? where id=?`,
        [Category, Id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send(resp.updateTrue(rows, res))
            }
        }
    )
    // next()
}

exports.delete = function(req, res){
    let Id = req.body.id;
    con.query(
        `DELETE FROM category where id=?`,
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