import moment from 'moment-with-locales-es6';

// returns true if the drone's updated time is more than 10 seconds ago
export const isDroneStale = (drone) => {
  const diffSecs = moment.duration(moment().diff(drone.updated)).asSeconds();
  return diffSecs > 10;
}

export const updatedHumanized = (updated) => {
  const seconds = -1 * moment.duration(moment(updated).diff(moment())).asSeconds();
  return `${seconds.toFixed(0)} seconds ago`;
}

