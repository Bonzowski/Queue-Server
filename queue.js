module.exports = class Queue {
	
	constructor(queue_id) {
		this.maxLength = 1000; //Maximum count of tickets before reload
		this.queue_id = queue_id;			// Queue id
		this.currentTicket = 0; //Current serving ticket number
		this.lastTicket = 0; // Last gived ticket number
		this.isOpen = 1; 
		this.name = "Kolejka " + this.queue_id.toString();
		this.description = "To jest " + this.name;
	}

	getPosition(ticketNumber) {
		if(ticketNumber >= this.currentTicket){
			return ticketNumber - this.currentTicket;
		}
		else {
			return this.maxLength - this.currentTicket + ticketNumber;
		}
	}
	
	reload() {
	
		this.currentTicket = 0;
	}

	newTicket() {
		if(this.isOpen == 1) {
			this.lastTicket += 1;
		}
		return this.lastTicket;
	}
	
	nextTicket() {
		this.currentTicket += 1;
	}

	stopTicketing() {
		this.isOpen = 0;
	}

	startTicketing() {
		this.isOpen = 1;
	}
}

