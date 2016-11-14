//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express();
    
Object.assign=require('object-assign')

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var Queue = require("./queue")
var q1 = new Queue(1);

var QueueManager = require("./queueManager");
var queueManeger = new QueueManager(5); 

app.get('/getTicket', function (req, res) {
	
	var queue_id = req.query.queue_id;
 	var queue = queueManeger.queues[queue_id];
	var date = new Date();
  	res.json({ queue_id: queue.queue_id,ticket_id: queue.newTicket(),date: date.toLocaleTimeString()});
});

app.get('/newManager', function (req, res) {

	queueManeger = new QueueManager(1);
	res.json({})
});

app.post('/addQueue', function (req,res) {
	if(!queueManeger) {
		queueManeger = new QueueManager(0);
	}
	queueManeger.addQueue(1);
	res.json({addedQueue: queueManeger.queues[0]});
});

app.get('/queues', function(req,res) {


	res.json({Queues: queueManeger.queues});
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
