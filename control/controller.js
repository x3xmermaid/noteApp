'use strict'

require('dotenv').config()

const con = require('../connection');
const resp = require('../response')
const model = require('./modelNote');
// const setting = require('./setting');

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
    let table = req.path;
    table = table.substring(1)
    let allSql = [model.update(table)];
    let allSet = [];
    let parameter = [];

    for (const key in req.body) {
        if(req.body[key] === `now()`){
            allSet.push(model.timeNow(``+key))
        }else{
            allSet.push(model.set(``+key))
            parameter.push(req.body[key]) 
        }
    }
    
    allSql.push(model.mergeSet(allSet));

    if((req.query.where)){
        let data = req.query.where
        data = data.split(" ");
        if(data.length !== 2){
            res.send("your where syntax is in correct")
            return 0;
        }else{
            allSql.push(model.where(data[0]))
            parameter.push(data[1]) 
        }
    }
            
    model.mergeSql(allSql, parameter, null, function(a, b){
        res.send(resp.updateTrue(a, res));
    });
    
}

exports.delete = function(req, res){
    let table = req.path;
    table = table.substring(1)
    let allSql = [model.delete(table)];
    let allSet = [];
    let parameter = [];

    if((req.query.where)){
        let data = req.query.where
        data = data.split(" ");
        if(data.length !== 2){
            res.send("your where syntax is in correct")
            return 0;
        }else{
            allSql.push(model.where(data[0]))
            parameter.push(data[1]) 
        }
    }
            
    model.mergeSql(allSql, parameter, null, function(a, b){
        res.send(resp.deleteTrue(a, res));
    });
}

exports.show = function(req, res){
    let table = req.path;
    table = table.substring(1)
    let allSql = [model.select2(table)];
    let parameter = [];
    let paging = [1,3];
    
    if((req.query.join)){
        let data = req.query.join
        data = data.split(" ");
        if(data.length !== 3){
            res.send("your join syntax is in correct")
            // res.end
            return 0;
        }else{
            allSql.push(model.iJoin(table, data[0], data[1], data[2]))
        }
    }

    if((req.query.search)){ 
        let data = req.query.search
        data = data.split(" ");
        if(data.length !== 2){
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
        paging = [req.query.page, req.query.limit]

    }
    
    model.mergeSql(allSql, parameter, paging ,function(a, b){
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
        if(!(tempRows[0])){
            tempRows = "Data Tidak Ditemukan"
        }

        const footNote = {
            total_Data: a.length,
            total_Page: totalPage,
            Data_in_page: tempRows.length,
            Page: page,
            next_Page: nextPage,
            back_Page: backPage,
            limit: limit
        }

        res.send(resp.showTrue(tempRows, footNote, res));

    });
}

exports.test = function(req, res){
    
    // const fs = require('fs');

    // let rawdata = fs.readFileSync('student.json');  
    
    // let student = {  
    //     name: 'M7',
    //     age: 23, 
    //     gender: 'Male',
    //     department: 'English',
    //     car: 'Honda' 
    // };

    // let data = JSON.stringify(student, null, 2);  
    // fs.writeFileSync('student-2.json', data);  

    let sql = `SELECT COLUMN_NAME as colom
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'noteapp' AND TABLE_NAME = 'notes'`

    let c= ``
    model.mergeSql(sql, null, null, function(a, b){
        // console.log(a);
        c = a
        let sql = `select * from notes`
        model.mergeSql(sql, null, null, function(a, b){
            console.log(c)
            // console.log(a)
        })
    })

    // console.log(rawdata);





}