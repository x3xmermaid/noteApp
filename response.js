'use strict'

exports.test = function (values, res){
    const testData = {
        status: 500,
        nama: "Mermaid",
        values: values,
    }
    res.json(testData);
    res.end;
}