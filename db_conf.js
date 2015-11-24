var mysql = require('mysql'); // Mysql include
var connection = mysql.createConnection({ // Mysql Connection
    host : 'crm-dev.c1mrkbbfrwar.us-east-1.rds.amazonaws.com',
    user : 'crmdev',
    password : 'EGO8hQUwkiQGIH2445nG',
    database : 'crm'
});

module.exports = connection;