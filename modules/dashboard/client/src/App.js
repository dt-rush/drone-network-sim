import React, { Component } from 'react';

// import app-wide stylesheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// set up routing
import {
  HashRouter
} from 'react-router-dom';

// nav and content are the two top-level components of the app
import AppNav from './AppNav';
import AppContent from './AppContent';

// create API object (drone data flows down from app level to components)
import API from './API';
const api = new API();

// top-level app component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      drones: [],
      city: null,
    };
  }
  // on mount, get city data, get drone data one time,
  // and set up interval to repeatedly get drone data every 2 seconds
  componentDidMount() {
    api.getCity()
      .then(city => {
        this.setState(state => (
          Object.assign({}, state, { city })
        ));
      });
    this._refreshDrones();
    setInterval(this._refreshDrones.bind(this), 2000);
  }
 // refresh drone data from API
  _refreshDrones() {
    api.getDrones()
      .then(drones => {
        this.setState(state => (
          Object.assign({}, state, { drones, isLoaded: true })
        ));
      });
  }
  render() {
    const { isLoaded, city, drones } = this.state;
    console.log(drones);
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <AppNav/>
          </header>
          {isLoaded && <AppContent city={city} drones={drones} />}
          {!isLoaded && <div className="centered"> LOADING </div>}
        </div>
      </HashRouter>
    );
  }
}

export default App;
