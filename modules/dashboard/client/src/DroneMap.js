import React, { Component } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import './DroneMap.css';
import DronePin from './DronePin';
import DroneCard from './DroneCard';

// in production we'd have to determine a means of putting this here securely
const MAPBOX_TOKEN="pk.eyJ1IjoiZHQtcnVzaCIsImEiOiJjampydmcwNjkzdnBpM3FybWxnd202azUxIn0.GV2IQK1abESDdGUYiYgQVg";

export default class DroneMap extends Component {
  // construct the state (viewport is passed as props to 
  // MapGL object)
  constructor(props) {
    super(props);
    this.state = {
      viewport: this._initialViewport(),
      focusedDrone: props.focusedDrone,
      hoveredDrone: null,
    };
  }

  // the viewport for the city's main view
  _initialViewport() {
    return {
      latitude: this.props.city.lat,
      longitude: this.props.city.lon,
      zoom: 10,
    };
  }
  // resize handler pattern from react-map-gl documentation
  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }
  _resize = () => {
    this.setState((state) => {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          width: (this.props.width || window.innerWidth),
          height: (this.props.height || window.innerHeight),
        }
      };
    });
  }
  _onViewportChange = (viewport) => {
    this.setState({viewport});
  }
  // listen to route change events and trigger resize on nav

  // state transformer given a viewport which
  // sets the viewport to fly to that viewport
  _flyToViewport = (v) => (state) => {
    return {
      ...state,
      viewport: {
        ...state.viewport,
        ...v,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      }
    };
  }
  // state transformer given a drone which
  // sets the focused drone to that drone
  _setFocusedDrone = (drone) => (state) => {
    return {
      ...state,
      focusedDrone: drone,
    };
  }

  // click handler for the map
  _handleMapClick = (event) => {
    // we need this guard because the map receives an onclick
    // event even if we clicked on a drone pin (NOTE: leaking implementation
    // since the click event gets the svg <path> element internal to the
    // DronePin). This could be avoided if the captureClick property of
    // react-map-gl's <Marker> worked.
    if (event.target.nodeName !== "path" && this.canClickMap) {
      this.setState(this._flyToViewport(this._initialViewport()));
      this.setState(this._setFocusedDrone(null));
    }
  }

  // returns an onclick handler for a drone
  _droneClicked = (drone) => () => {
    // this.canClickMap is a simple guard flag to make sure we don't
    // click on the map by accident after we click the drone, during
    // flying (this would reset the view and unset our selection)
    this.canClickMap = false;
    setTimeout(() => { this.canClickMap = true }, 1000);
    // get the viewport which will fir both the drone and its destination
    const { viewport } = this.state;
    const bounds = new WebMercatorViewport({...this.state.viewport})
      .fitBounds(
        [[drone.position.lon,
           drone.position.lat], 
          [drone.destination.lon,
           drone.destination.lat]],
        {
          // padding is calculated so as to put the bounds in the top-half
          // of the viewport, so that the fixed-position DroneCard won't
          // cover the markers
          padding: {
            top: Math.min(viewport.width/4, viewport.height/4),
            left: Math.min(viewport.width/3, viewport.height/3),
            right: Math.min(viewport.width/3, viewport.height/3),
            bottom: viewport.height/2,
          },
        },
      );
    // set the viewport and the focused drone using the state transition
    // functions
    this.setState(this._flyToViewport(bounds));
    this.setState(this._setFocusedDrone(drone));
  }

  // set the hovered drone
  _droneHovered = (drone) => () => (
    this.setState((state) => ({...state, hoveredDrone: drone}))
  )
  // unset the hovered drone
  _droneUnhovered = (drone) => () => (
    this.setState((state) => ({...state, 
      hoveredDrone: state.hoveredDrone === drone ? null : state.hoveredDrone}))
  )
  // render the marker for a drone
  _renderDroneMarker = (drone) => {
    return this._renderMarker({
      key: drone.id,
      position: drone.position,
      pinProps: {
        focused: drone === this.state.focusedDrone, 
        onClick: this._droneClicked(drone),
        onMouseEnter: this._droneHovered(drone),
        onMouseLeave: this._droneUnhovered(drone),
      }
    });
  }

  // render the marker for a destination
  _renderDestinationMarker = (destination) => {
    return this._renderMarker({
      key: 'destination',
      position: destination,
      pinProps: {fill: '#0CA'},
    });
  }

  // render a marker given params (used to render drones and destinations)
  _renderMarker = (params) => {
    const { key, position, pinProps } = params;
    return (
      <Marker key={key}
        latitude={position.lat}
        longitude={position.lon}
        >
        <DronePin size={20} {...pinProps} />   
      </Marker>
    );
  }

  componentWillReceiveProps() {
    // get the actual drone object from the drones list which corresponds to
    // the one we've focused (to avoid the DroneCard holding onto a reference
    // to an old object from a past API call while the props.drones array has 
    // been replaced) and set state
    const { drones } = this.props;
    if (this.state.focusedDrone) {
      const focusedDrone = drones.filter(drone => drone.id === this.state.focusedDrone.id)[0]
      this.setState({focusedDrone});
    }
  }

  render() {
    var focusedMarkers;
    const { viewport, focusedDrone, hoveredDrone } = this.state;
    const { drones } = this.props;
    if (focusedDrone) {
      focusedMarkers = [
        this._renderDestinationMarker(focusedDrone.destination),
        this._renderDroneMarker(focusedDrone),
      ];
    }
    return (
      // note that the order Marker components are added inside MapGL
      // determines their stacking in the UI
      <div className="DroneMap">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this._onViewportChange}
          onClick={this._handleMapClick}
        >
          {/* render drones which aren't focused */}
          {drones.filter(
            drone => drone !== focusedDrone).map(
            this._renderDroneMarker)}
          {/* render the drone and its destination if we have a drone focused */}
          {focusedDrone && focusedMarkers}
          {hoveredDrone && 
            <Popup 
              className="idPopup"
              latitude={hoveredDrone.position.lat} 
              longitude={hoveredDrone.position.lon}
              anchor="top"
              closeButton={false}
            >{hoveredDrone.id}</Popup>}
        </ReactMapGL>
        {focusedDrone && 
            <DroneCard classNames="fixed-bottom-left" drone={focusedDrone}/> }
      </div>
    ); 
  }
}
