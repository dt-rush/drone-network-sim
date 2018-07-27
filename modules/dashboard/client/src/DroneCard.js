import React from 'react';

import './DroneCard.css';
import { isDroneStale, updatedHumanized } from './droneUtils';
import { latlonToString } from './latlonUtils';

const DronePropertyRow = (props) => (
  <div className={`DronePropertyRow ${props.className}`}>
    <span className="property">{props.property}</span>
    <span className="value">{props.value}</span>
  </div>
);

export default (props) => {
  const { drone } = props;
  return (
    <div className={`DroneCard 
      ${isDroneStale(drone) ? 'stale' : ''} 
      ${props.classNames}`}
    >
      <DronePropertyRow 
        property="id" 
        value={drone.id} />
      <DronePropertyRow 
        property={isDroneStale(drone) ? 'updated (stale)' : 'updated'}
        className={isDroneStale(drone) ? 'stale' : ''}
        value={updatedHumanized(drone.updated)} />
      <DronePropertyRow 
        property="position"
        value={latlonToString(drone.position)} />
      <DronePropertyRow 
        property="destination"
        value={latlonToString(drone.destination)} />
    </div>
  );
}
