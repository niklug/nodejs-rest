var express = require('express');
var app = express();
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data

var connection = mysql.createConnection({ // Mysql Connection
    host : 'localhost',
    user : 'root',
    password : '1111',
    database : 'testdb',
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users',function(req,res){
    connection.query("SELECT * from users",function(err, rows, fields){
        res.json(rows);
    });
});

app.post('/users', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var data = {
        result : 'Data added succesfully!',
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



app.listen(3001);

console.log('Listening on port 3001...');