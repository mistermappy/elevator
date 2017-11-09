var Passenger = require('./passenger.js')

var EventEmitter = require('events')

var Ghoul = new Passenger('Ghoul', 7)
var Zombie = new Passenger('Zombie', 2)
var Orc = new Passenger('Orc', 5)

var passengers = [
	Ghoul, Zombie, Orc
];

function Elevator(currentPassenger, currentFloor) {
	this.currentPassenger = currentPassenger || {};
	this.currentFloor = currentFloor || 0; 
}

//gives Passenger object access to EventEmitter methods
Elevator.prototype = new EventEmitter();

Elevator.prototype.loadPassenger = function(passenger) {
	console.log(`loading ${passenger.name} at floor ${this.currentFloor}`);
	this.currentPassenger = passenger; 
	this.emit('up');
	}

Elevator.prototype.unloadPassenger = function(passenger){
	console.log(`Unloading ${this.currentPassenger.name} at floor ${this.currentFloor}`)
	this.currentPassenger = {}; 
	this.emit('down'); 
}

Elevator.prototype.goUp = function(){
	console.log(`Currently at floor ${this.currentFloor} Going up..`)
	this.currentFloor++; 
}

Elevator.prototype.goDown = function(){
	console.log(`Currently at floor ${this.currentFloor} Going down..`)
	this.currentFloor--; 
}

var elevator = new Elevator; 

elevator.on('up', function(){

	setTimeout(function(){
	if (this.currentFloor == this.currentPassenger.desiredFloor){
		this.unloadPassenger();
	}
	else {
		this.goUp(); 
		this.emit('up');	
	}
	}.bind(this), 1000)
});

elevator.on('down', function(){

	setTimeout(function(){
		if(this.currentFloor !== 0) {
			this.goDown();
			this.emit('down')
		}
		else {

			var nextPassenger = passengers.pop(); 

			if(nextPassenger) {
				this.loadPassenger(nextPassenger)
			}
			else {
				console.log(`there are no more passengers at floor ${this.currentFloor} Waiting for next passenger..`)
			}
		}
		}.bind(this), 1000)
	});

elevator.loadPassenger(passengers.pop())