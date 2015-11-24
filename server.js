var express = require('express');
var app = express();
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = require('./db_conf.js');
var amqp = require('./amqp');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users',function(req,res){
    connection.query("SELECT * from users",function(err, rows, fields){
        res.json(rows);
    });
});

app.get('/users/:id',function(req,res){
    var id = req.params.id;
    connection.query("SELECT * from users WHERE id=?", [id], function(err, rows, fields){
        res.json(rows);
    });
});

app.post('/users', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var data = {
        result : 'Data added successfully!',
        error : 0
    };

    if(!!username && !!password){
        connection.query("INSERT INTO users VALUES('',?,?)",[username, password], function(err, rows, fields){
            if(!!err){
                data["error"] = 1;
                data["result"] = "Error Adding data";
            }
            res.json(data);
        });
    } else {
        data["result"] = "Please provide all required data";
        res.json(data);
    }
});

app.put('/users',function(req,res){
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        result : 'Data updated successfully!',
        error : 0
    };

    if(!!id && !!username && !!password) {
        connection.query("UPDATE users SET username=?, password=? WHERE id=?",[username, password, id], function(err, rows, fields){
            if(!!err){
                data["error"] = 1;
                data["result"] = "Error Updating data";
            }
            res.json(data);
        });
    } else {
        data["result"] = "Please provide all required data";
        res.json(data);
    }
});

app.delete('/users',function(req,res){
    var id = req.body.id;
    var data = {
        result : 'Data deleted successfully!',
        error : 0
    };

    if(!!id) {
        connection.query("DELETE FROM users  WHERE id=?",[id], function(err, rows, fields){
            if(!!err){
                data["error"] = 1;
                data["result"] = "Error Deleting data";
            }
            res.json(data);
        });
    } else {
        data["result"] = "Please provide all required data";
        res.json(data);
    }
});


app.listen(3001);

console.log('Listening on port 3001...');