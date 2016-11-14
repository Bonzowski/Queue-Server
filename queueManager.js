var Queue = new require('./queue');
module.exports = class QueueManager {

	constructor(queuesCount) {
		if(queuesCount > 0) {
			this.queues = new Array();
			for(var i = 0; i < queuesCount; i++){
				this.queues.push(new Queue(i));
			}
		}
	}
	
	addQueue(){
		if(!this.queues) {
			this.queues = new Array(queue(0));
			return;
		}
		this.queues.push(new Queue(this.queues.length));
	}
	
	dropQueue(queue_id) {
		if(this.queues) {
			this.queues.splice(queue_id,1);	
		}
	}
	
	stopTicketingAtQueue(queue_id) {
		this.queues[queue_id].stopTicketing();
	}
	
	startTicketingAtQueue(queue_id) {
		this.queues[queue_id].startTicketing();
	}
	
	get queuesCount() {
		if(this.queues){
			return this.queues.length;
		}
	}

	// get queues() {
	// 	return this.queues;
	// }

	// set queues
}