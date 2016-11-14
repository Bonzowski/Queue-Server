

var express = require('express');
var app = express();

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

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host,port);
})