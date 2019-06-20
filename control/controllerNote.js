'use strict'

require('dotenv').config()

const con = require('../connection');
const resp = require('../response')
const model = require('./modelNote');
// const count = 3

let mergeModel = function(req, res){

}

exports.a = function(req, res){
    let allSql = [model.select(),'','',''];
    let parameter = [];
    // for (const key in req.query) {
    //     console.log(key, req.query[key])
    // }
      

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

exports.show = function(req, res, next){
    let sql = `SELECT d.id, title, note, time, C.category FROM data as d inner join category as C on d.id_category=C.id`
    let allSql = [sql];
    let parameter =[];
    
    if((req.query.title)){
        allSql.push(`where title=?`)
        parameter.push(req.query.title)   
    }
    
    if((req.query.sorting)){
         allSql.push(`order by id ` + req.query.sorting)
    }

    if((req.query.page)){
        if(!(req.query.count)){
            req.query.count = process.env.COUNT;
        }
        let offset = (req.query.page - 1) * req.query.count;
        let count = parseInt(req.query.count, 10);
        allSql.push(`limit ?, ?`) 
        parameter.push(offset, count);  
    }

    allSql = allSql.join(' ');
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
    // if(req.body.title){
    //     allSql.push(`title = ?`)
    //     parameter.push(req.body.title) 
    // }
    // if(req.body.note){
    //     allSql.push(`note = ?`)
    //     parameter.push(req.body.note) 
    // }
    // if(req.body.idCategory){
    //     allSql.push(`id_category = ?`)
    //     parameter.push(req.body.idCategory) 
    // }
    // if(req.query.id){
    //     sqlID = ` where id = ?`;
    //     parameter.push(req.query.id) 
    // }
    // for(let i=0; i < allSql.length;i++){
    //     if(i === allSql.length-1){
    //         sql = sql.concat(allSql[i]);
    //     }else{
    //         sql = sql.concat(allSql[i], ', ');
    //     }
    // }
    // sql =  sql.concat(sqlID);
    // con.query(sql, parameter,
    //     function (error, rows, field) {
    //         if(error){
    //             throw error;
    //         }else{
    //             return res.send(resp.insertTrue(rows, res))
    //         }
    //     }
    // )
    
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

exports.path = function(req, res){
    let table = req.path;

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