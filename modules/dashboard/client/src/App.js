import React, { Component } from 'react';
import './App.css';

import API from './API';
const api = new API();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drones: [],
      city: null,
    };
  }
  componentDidMount() {
    api.getDrones() 
      .then(drones => {
        console.log(drones);
        this.setState({drones});
      });
  }
  render() {
    const { drones } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Drone Dashboard</h1>
        </header>
        <p>
          {drones &&
            drones.map(drone => (
              <div><pre>{JSON.stringify(drone)}</pre><br/></div>
            ))}
        </p>
      </div>
    );
  }
}

export default App;
