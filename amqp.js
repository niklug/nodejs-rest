var amqp = require('amqp');
var connection = require('./db_conf');
var amqpConfig = {
    'host': 'pink-penguin.rmq.cloudamqp.com',
    'login': 'qycixbrk',
    'password': 'TDxvW5z5MK3bvivY5Nx99xJzB8qHhhwP',
    'port': 5672,
    'vhost': 'qycixbrk'
};
var amqpConnection = amqp.createConnection(amqpConfig, {defaultExchangeName: "ps.crm.contentauthors.v1"});
amqpConnection.on('ready', function () {
    console.log('connected');
    amqpConnection.queue('ps.crm.contentauthors-listener.v1', {'durable': true, 'autoDelete': false}, function (queue) {
        console.log('Queue ' + queue.name + ' is open');
        // Catch all messages
        queue.bind('#');
        // Receive messages
        queue.subscribe(function (message, headers, deliveryInfo, messageObject) {
            // Print messages to stdout
            var strMessage = message.data.toString();
            console.log(strMessage);
            connection.query("INSERT INTO test VALUES('', ?)", [strMessage], function (err, rows, fields) {
                if (!!err) {
                    console.log(err);
                }
            });
        });
    });
});
amqpConnection.on('error', function (e) {
    console.log(e);
});

//app.get('/amqp-authors/',function(req,res){
//
//});

