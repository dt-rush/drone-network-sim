const WebSocket = require('ws');
const uuid = require('uuid/v4');
const { randomDrone } = require('./mockDrone.js');

// get shared config
const shared = require('./shared');
const config = shared.config;

// small radius around city center
const RADIUS = 0.10;

// updates a given drone by sending its current data
// over a websocket via protobuf to the net-ops-center
const updateDrone = (drone) => {
	console.log(`sending drone ${drone.id} over websocket as protobuf...`);
}

// an object which is used to repeatedly update a drone
const DroneUpdater = (drone, delay, url) => {
	updating = true;
	return {
		stop: () => { updating = false },
		updateDrone: () => {
			const ws = new WebSocket(url);
			ws.onerror = (err) => console.error(err.message);
			ws.onopen = () => {
				ws.send(JSON.stringify(drone));
				ws.close();
			};
		},
		runUpdate: function() {
			if (updating) {
				this.updateDrone();
				setTimeout(this.runUpdate.bind(this), Math.random() * 2 * delay);
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
	updater.runUpdate();
};

module.exports = {
	runSim,
}
