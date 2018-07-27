const moment = require('moment');

// calculate distance from drone to its destination
const distanceFromDestination = (drone) => {
  const dLon = drone.destination.lon - drone.position.lon;
  const dLat = drone.destination.lat - drone.position.lat;
  return Math.sqrt(dLon * dLon + dLat * dLat);
}

// give the next position of the drone toward destination according to velocity
const nextPositionTowardDestination = (drone, seconds) => {
  const dLon = drone.destination.lon - drone.position.lon;
  const dLat = drone.destination.lat - drone.position.lat;
  const magnitude = Math.sqrt(dLon * dLon + dLat * dLat);
  // apply v * dt to the position
  // the constants convert meters to lat/lon degrees
  var dLonV = (dLon/magnitude) * seconds * drone.velocity / 88904.6;
  var dLatV = (dLat/magnitude) * seconds * drone.velocity / 111319.9;
  // prevent overshooting the destination
  if (Math.abs(dLonV) > Math.abs(dLon)) {
	dLonV = dLon;
  }
  if (Math.abs(dLatV) > Math.abs(dLat)) {
	dLatV = dLat;
  }
  // return the modified position
  return {
	lon: drone.position.lon + dLonV,
	lat: drone.position.lat + dLatV,
  };
}

// return a random latlon position relative to the city within a certain radius
const randomPosition = (city, radius) => {
  const r = radius * Math.random();
  const theta = 2 * Math.PI * Math.random();
  return {
	lat: city.lat + r * Math.cos(theta),
	lon: city.lon + r * Math.sin(theta),
  };
}

// return a random latlon position relative to the given position
// within a certain radius
const randomDestination = (position, radius) => {
  const r = radius * Math.random();
  const theta = 2 * Math.PI * Math.random();
  return {
	lat: position.lat + r * Math.cos(theta),
	lon: position.lon + r * Math.sin(theta),
  };
}

// return a random drone velocity (meters per second)
const randomVelocity = () => {
  return 30 + 5 * Math.random();
}

// return a random datetime within the last `minutes` minutes from present
const randomUpdatedTime = (minutes) => {
  return moment().subtract(20 * Math.random(), 'seconds');
}

const randomDrone = (city, radius, id) => {
	const position = randomPosition(city, radius);
	return {
	  id: id,
	  updated: randomUpdatedTime().toISOString(),
	  position: position,
	  velocity: randomVelocity(),
	  destination: randomDestination(position, radius*0.8),
	};
}

// we export methods for testing but only those matching http verbs will be
// hooked up to the app router
module.exports = {
	distanceFromDestination,
	nextPositionTowardDestination,
	randomPosition,
	randomDestination,
	randomVelocity,
	randomUpdatedTime,
	randomDrone,
}
