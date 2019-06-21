'use strict'

require('dotenv').config()

const con = require('../connection');
const resp = require('../response')
const model = require('./modelNote');
// const setting = require('./setting');
// const count = 3

exports.insert = function(req, res){
    let table = req.path;
    table = table.substring(1)
    let allSql = [model.insert(table)];
    let parameter = [];
    let allSet = [];

    for (const key in req.body) {
        if(req.body[key] === `now()`){
            allSet.push(model.timeNow(``+key))
        }else{
            allSet.push(model.set(``+key))
            parameter.push(req.body[key]) 
        }
    }

    allSql.push(model.mergeSet(allSet));
    model.mergeSql(allSql, parameter, null, function(a, b){
        res.send(resp.insertTrue(a, res));
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
    model.mergeSql(allSql, parameter, null, function(a, b){
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
    table = table.substring(1)
    let allSql = [model.select2(table)];
    let parameter = [];
    let paging = [1,3];
    
    // try{
    if((req.query.join)){
        let data = req.query.join
        data = data.split(" ");
        console.log(data.length)
        if(data.length < 3 || data.length > 3){
            res.send("your join syntax is in correct")
            // res.end
            return 0;
        }else{
            allSql.push(model.iJoin(table, data[0], data[1], data[2]))
        }
    }
    // }catch(error){
    //     console.log("rusak");
    // }


    if((req.query.search)){ 
        let data = req.query.search
        data = data.split(" ");
        console.log(data.length)
        if(data.length < 2 || data.length > 2){
            res.send("your search syntax is in correct")
            // res.end
            return 0;
        }else{
            allSql.push(model.search(data[0]))
            parameter.push(data[1]) 
        }
 
    }
    
    if((req.query.sorting)){
        let data = req.query.sorting
        data = data.split(" ");
        console.log(data.length)
        if(data.length === 1){
            data[1] = "asc"
            // res.end
        }else if(data.length === 2){
            data[1] = data[1]
        }else{
            res.send("your sorting syntax is in correct")
            return 0;
        }
        allSql.push(model.sorting(data[0], data[1]))
        // parameter.push(``+)   
    }

    if((req.query.page)){
        if(!(req.query.limit)){
            req.query.limit = process.env.COUNT;
        }
        // let page = parseInt(req.query.count, 10);
        // let limit = parseInt(req.query.count, 10);
        // allSql.splice(3, 1, model.limit())
        // parameter.push(offset, count) ; 
        paging = [req.query.page, req.query.limit]

    }
    // let sql = 
    model.mergeSql(allSql, parameter, paging ,function(a, b){
        // ca
        let page = 0
        let limit = 0
        if((b[1])){
            page = parseInt(b[0], 10);
            limit = parseInt(b[1], 10);
        }

        var tempRows = [];
        let first = (page - 1) * limit ;
        let last = first + limit;
        let totalPage = a.length/limit;
        totalPage = Math.ceil(totalPage);
        let nextPage = totalPage - page;
        let backPage = page - 1;
  
        // console.log(c)
        const footNote = {
            total_Data: a.length,
            total_Page: totalPage,
            Page: page,
            next_Page: nextPage,
            back_Page: backPage,
            limit: limit
        }
        if((b[1])){
            let temp =0; 
            for(let i= first; i<last;i++){
                if(!(a[i])){
                    break;
                }
                tempRows[temp] = a[i]
                temp++
            }
        }else{
            tempRows = a
        }
        // console.log(c)
        if(!(tempRows[0])){
            tempRows = "Data Tidak Ditemukan"
        }

        res.send(resp.showTrue(tempRows, footNote, res));

    });
}

exports.test = function(req, res){
    // setting.table()
    if((req.query.join)){
        let data = req.query.join
        data = data.split(" ");
        console.log(data)
        if(data.length < 5){
            res.send("syntax join anda salah")
            // res.end
        }
    }
}