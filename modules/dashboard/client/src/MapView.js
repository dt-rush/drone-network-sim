import React from 'react';

import DroneMap from './DroneMap';

import "./MapView.css";

export default (props) => (
  <div className="MapView">
    <DroneMap drones={props.drones} city={props.city} />
  </div>
);
