'use strict'

const con = require('../connection');
const resp = require('../response')

exports.show = function(req, res){
        let id= req.params.id
        con.query(
                `SELECT tb_product.id_store, tb_store.store_name, tb_store.location FROM tb_product 
                 INNER JOIN tb_cart on tb_cart.id_product=tb_product.id_product 
                 INNER JOIN tb_store on tb_store.id_store=tb_product.id_store 
                 where tb_cart.id_user=${id} and tb_cart.buyed=1 group by tb_product.id_store`,
                function(error, rows, field){
                    if(error){
                        throw error;
                    }else{
                        con.query(`SELECT * FROM tb_product
                                    INNER JOIN tb_cart on tb_cart.id_product=tb_product.id_product 
                                    where tb_cart.id_user=${id} and tb_cart.buyed=1`,
                                function(err, rows2, field){
                                    if(err){
                                        throw err
                                    }else{
                                        res.json({
                                            store : rows,
                                            product: rows2 
                                        })
                                    }
                                }
                        )
                    }
                }
        )
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