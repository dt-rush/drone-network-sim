import React, { Component } from 'react';

// Content is aware of routing and displays a different view depending
import {
  withRouter,
} from "react-router-dom";

// import styling
import "./AppContent.css";

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
    const { city, drones } = this.props;
    return (
      <div className="AppContent">
        {/* this particular pattern is needed so that we can properly hide
          the map -- preventing it from being remounted and having to call
          the mapbox API again, while is still retains knowledge of its
          size and can resize properly while hidden as well.

          credit for this trick:
          https://stackoverflow.com/a/35487429/9715599

          more detailed write-up I have added as a comment in an issue I opened
          on the `react-map-gl` repo:

          https://github.com/uber/react-map-gl/issues/555
          */}
        <div className="AppContent-view"
          style={{
              position: 'fixed',
              opacity: location === '/' ? '1.0' : '0.0',
              zIndex: location === '/' ? '1' : '-1',
        }}>
          <MapView city={city} drones={drones} />
        </div>
        <div className="AppContent-view"
          style={{display: location === '/cards' ? 'block' : 'none'}}>
          <CardsView drones={drones} />
        </div>
      </div>
    );
  }
}

export default withRouter(AppContent);
