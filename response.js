'use strict'

exports.insertTrue = function (values, value2, value3, res){
    const message = {
        error: false,
        row: values,
        parameter: value2,
        parameter2: value3,
        Message: "data Has Been Created"
    }
    res.json(message);
    res.end;
}

exports.updateTrue = function (values, res){
    const message = {
        error: "false",
        row: values,
        Message: "data Has Been updated"
    }
    res.json(message);
    res.end;
}

exports.deleteTrue = function (values, value2, res){
    const message = {
        error: false,
        row: values,
        parameter: value2,
        Message: "data Has Been deleted"
    }
    res.json(message);
    res.end;
}

exports.showTrue = function (value, value2, res){
    const message = {
        Data: value,
        note: value2
    }
    res.send(res.json(message))
    // res.json(message);
    res.end;
}