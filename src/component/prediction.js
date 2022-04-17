import React, { useEffect, useState } from "react";
import { compose,
  withProps,
  withState,
  withHandlers
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import _ from "lodash";
import {
  getAvailableSatellite,
  getPrediction,
} from "../service/cubesatAPIService";
import { DEFAULT_ZOOM, DEFAULT_CURSOR } from "../util/constant";
import PropTypes from "prop-types";
import DataTable from "./dataTable";
import DropDown from "./dropDown";

const Prediction = (props) => {
  Prediction.propTypes = {
    onMapMounted: PropTypes.func,
    onZoomChanged: PropTypes.func,
    zoom: PropTypes.object,
  };

  const [cursorLatLng, setCursorLatLng] = useState(DEFAULT_CURSOR);
  const [upcomingPass, setUpcomingPass] = useState({});
  const [satellite, setSatellite] = useState("");
  const [dropdownList, setDropdownList] = useState([]);

  /**
   * Initialize dropdown on page load
   */
  useEffect(() => {
    const getDropdownList = async () => {
      setDropdownList(await getAvailableSatellite());
    };

    if (dropdownList.length === 0) {
      getDropdownList().then();
    }
  });

  /**
   * Update upcomingPass whenever
   * value of `dropdownSelect` or `cursorLatLng` change
   */
  useEffect(() => {
    const getUpcomingPass = async () => {
      setUpcomingPass(
          await getPrediction(
              {
                lat: _.get(cursorLatLng, "lat", DEFAULT_CURSOR.lat),
                lng: _.get(cursorLatLng, "lng", DEFAULT_CURSOR.lng),
              },
              satellite
          )
      );
    };
    getUpcomingPass().then();
  }, [satellite, cursorLatLng]);

  const EmbeddedMap = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withState("zoom", "onZoomChange", DEFAULT_ZOOM),
      withHandlers(() => {
        const mapReference = {
          map: undefined,
        };

        return {
          onMapMounted: () => (ref) => {
            mapReference.map = ref;
          },
          onZoomChanged:
          ({ onZoomChange }) =>
            () => {
              onZoomChange(mapReference.map.getZoom());
            },
        };
      }),
      withScriptjs,
      withGoogleMap
  )((props) => (
    <GoogleMap
      ref={props.onMapMounted}
      defaultCenter={cursorLatLng}
      defaultZoom={DEFAULT_ZOOM}
      zoom={props.zoom}
      onZoomChanged={props.onZoomChanged}
      onClick={(mouseEvent) => {
        setCursorLatLng({
          lat: mouseEvent.latLng.lat(),
          lng: mouseEvent.latLng.lng(),
        });
      }}
    >
      {<Marker position={cursorLatLng} />}
    </GoogleMap>
  ));

  return (
    <div className="Prediction Map">
      <EmbeddedMap />

      <DropDown
        displayText={"Satellite"}
        id={"Dropdown-Selector"}
        label={"Dropdown-Selector"}
        selection={dropdownList}
        selected={satellite}
        setSelected={setSatellite}
      />

      <DataTable
        data={upcomingPass}
      />
    </div>
  );
};

export default Prediction;
