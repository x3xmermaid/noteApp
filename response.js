'use strict'

exports.insertTrue = function (values, res){
    const message = {
        error: "False",
        row: values,
        Message: "data Has Been Created"
    }
    res.json(message);
    res.end;
}

exports.updateTrue = function (values, res){
    const message = {
        error: "False",
        row: values,
        Message: "data Has Been updated"
    }
    res.json(message);
    res.end;
}

exports.deleteTrue = function (values, res){
    const message = {
        error: "False",
        row: values,
        Message: "data Has Been deleted"
    }
    res.json(message);
    res.end;
}