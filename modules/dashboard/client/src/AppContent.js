import React, { Component } from 'react';

// Content is aware of routing and displays a different view depending
import {
  withRouter,
} from "react-router-dom";

// import views
import MapView from "./MapView";
import CardsView from "./CardsView";
  
// this component will be exported at the bottom of this file wrapped with 
// the react-router-dom package's withRouter higher-order-component, so 
// that it can get access to the location property and set styling on 
// views directly
export class AppContent extends Component {
  constructor(props) {
    super(props)
    // state.location gets updated on route changes by history listener
    // attached below
    this.state = {
      // route to the hash on page load
      location: window.location.hash.substr(1)
    };
  }
  // on mount, attach a history listener callback to update the state's
  // `location` variable
  componentDidMount() {
    this.unlistenHistory = this.props.history.listen((location, action) => {
      this.setState(_ => ({ location: location.pathname }));
    });
  }
  // on unmount, detach the history listener
  componentWillUnmount() {
    this.unlistenHistory();
  }
  render() {
    // styles are hidden / shown depending on location
    const { location } = this.state;
    return (
      <div className="AppContent">

        <div style={{display: location === '/' ? 'block' : 'none'}}>
          <MapView city={this.props.city} drones={this.props.drones} />
        </div>

        <div style={{display: location === '/cards' ? 'block' : 'none'}}>
          <CardsView drones={this.props.drones} />
        </div>

      </div>
    );
  }
}

export default withRouter(AppContent);
