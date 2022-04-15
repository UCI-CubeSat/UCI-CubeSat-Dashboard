import React from "react";
import FlightMap from "./flightMap";
import PropTypes from "prop-types";

const MapView = (props) => {
  MapView.propTypes = {
    tabContext: PropTypes.object,
  };

  return <FlightMap tabContext={props.tabContext} />;
};

export default MapView;
