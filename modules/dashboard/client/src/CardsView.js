import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import DroneCard from './DroneCard';

export default (props) => {
  const { drones } = props;
  var rows = [];
  for (var i = 0; i < drones.length; i += 3) {
    var row = [];
    for (var j = 0; j < 3 && i + j < drones.length; j++) {
      row.push(
        <Col xs={12} sm={6} md={4} key={i+j}>
          <DroneCard drone={drones[i+j]}/>
        </Col>
      );
    }
    rows.push(row);
  }
  return (
    <div className="CardsView">
      <Grid>
        {rows.map((row, i) => <Row key={i}>{row}</Row>)}
      </Grid>
    </div>
  );
}
