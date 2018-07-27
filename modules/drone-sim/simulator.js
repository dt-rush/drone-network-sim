const WebSocket = require('ws');
const uuid = require('uuid/v4');
const moment = require('moment');
const {
	randomDrone,
	randomVelocity,
	randomDestination,
	distanceFromDestination,
	nextPositionTowardDestination } = require('./mockDrone.js');

// get shared config
const shared = require('./shared');
const config = shared.config;
const model = shared.model;

// small radius around city center
const RADIUS = 0.10;

// an object which is used to repeatedly update a drone
const DroneUpdater = (drone, delay, url) => {
	updating = true;
	// used to calculate positional movement according to velocity
	last_update = moment();

	// return an object with methods that can access function params
	// and the closure state variables above
	return {

		// stop method stops the drone from updating
		stop: () => { updating = false },

		// updateDrone method updates the drone and sends its updated data
		// to the net-ops-center
		updateDrone: () => {
			// move drone toward its destination
			const seconds = moment.duration(moment().diff(last_update)).asSeconds();
			drone.position = nextPositionTowardDestination(drone, seconds);
			// modify the drone's velocity slightly
			drone.velocity = (drone.velocity + randomVelocity()) / 2;
			// create a new destination if the drone is close enough to its
			// destination
			if (distanceFromDestination(drone) < RADIUS / 100) {
				drone.destination = randomDestination(config.city, RADIUS);
				drone.velocity = randomVelocity();
			}
			// send updated drone through websocket
			const ws = new WebSocket(url);
			ws.onerror = (err) => console.error(err.message);
			ws.onopen = () => {
				// update `updated` timestamp
				drone.updated = moment().toISOString();
				// build and send protobuf message
				const DronePB = model.drone.pb;
				const bytes = DronePB.encode(DronePB.fromObject(drone)).finish();
				console.log(`sending ${drone.id} to net-ops-center...`);
				ws.send(bytes);
				ws.close();
				console.log(`sent.`);
			};
			// last last_update time
			last_update = moment();
		},
		
		// runUpdate method starts the updater running
		run: function() {
			if (updating) {
				this.updateDrone(url);
				setTimeout(this.run.bind(this), Math.random() * 2 * delay);
			}
		}
	};
};

// run the simulation
const runSim = (url) => {
	// create the drone
	const drone = randomDrone(config.city, RADIUS, uuid());
	// create and run the updater
	const updater = DroneUpdater(drone, 10000, url);
	updater.run();
};

module.exports = {
	runSim,
}
