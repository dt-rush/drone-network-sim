const WebSocket = require('ws');
const uuid = require('uuid/v4');
const moment = require('moment');
const { randomDrone } = require('./mockDrone.js');

// get shared config
const shared = require('./shared');
const config = shared.config;
const model = shared.model;

// small radius around city center
const RADIUS = 0.10;

// an object which is used to repeatedly update a drone
const DroneUpdater = (drone, delay, url) => {
	updating = true;
	return {
		stop: () => { updating = false },
		updateDrone: () => {
			const ws = new WebSocket(url);
			ws.onerror = (err) => console.error(err.message);
			ws.onopen = () => {
				drone.updated = moment().toISOString();
				const DronePB = model.drone.pb;
				const bytes = DronePB.encode(DronePB.fromObject(drone)).finish();
				console.log(`sending ${drone.id} to net-ops-center...`);
				ws.send(bytes);
				ws.close();
				console.log(`sent.`);
			};
		},
		runUpdate: function() {
			if (updating) {
				this.updateDrone(url);
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
