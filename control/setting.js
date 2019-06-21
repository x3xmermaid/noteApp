'use strict'

module.exports = {
    table: function(value){
         value = 'notes';
        const tableName = {
            1: notes,
            tablefield: {q: "id",
            a: "title",
            s: "note",
            c: "time",
            f: "id_category"}]
        ,
            data: ["id",
                "title",
                "note",
                "time",
                "id_category"
            ]
        }
        

        console.log(tableName[value]["q"]);
    }
}