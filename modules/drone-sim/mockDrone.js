const moment = require('moment');

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
  return 5 * Math.random();
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
	randomPosition,
	randomDestination,
	randomVelocity,
	randomUpdatedTime,
	randomDrone,
}
