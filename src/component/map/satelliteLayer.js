import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  DEFAULT_VIEW_STATE,
  DEFAULT_MAP_SETTING,
} from "../../util/constant";
import { getImage } from "../../util/helper";
import ReactMap, {
  Marker,
  FullscreenControl,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import _ from "lodash";
import "mapbox-gl/dist/mapbox-gl.css";
import icon from "../../resource/icon.svg";
import { getAvailableSatellite, getPath } from "../../service/cubesatAPIService";
import { PageContext } from "../tab/navigationTab";
// import Logo from "../util/logo";
/* eslint-disable*/
import {Feature, FeatureCollection, GeoJsonProperties, Point, Position} from 'geojson';

export const satelliteLayerId = 'satellites';

const SatelliteLayer = () => {
  const [path, setPath] = useState([]);
  const [featureCollection, setFeatureCollection] = useState({
    type: "FeatureCollection",
    features: [],
  })
  const [pathPredictions, setPathPredictions] = useState([]); 

  useEffect(() => {
    let features = []

    // requestAnimationFrame makes sure the function inside is called before the next repaint
    const animation = window.requestAnimationFrame(async () => {

      const pathResponse = await getPath();
      

      console.log("pathResponse is:", pathResponse)
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            pathResponse["latLng"]["lng"],
            pathResponse["latLng"]["lat"],
          ]
        }
      });

      setFeatureCollection({
        type: "FeatureCollection",
        features: features,
      })
    })

    return () => {
      window.cancelAnimationFrame(animation);
    };
  }, [featureCollection]);

  return (
    <ReactMap
      initialViewState={{
        longitude: DEFAULT_LONGITUDE,
        latitude: DEFAULT_LATITUDE,
        zoom: DEFAULT_ZOOM,
      }}
      style={{
        width: 1080,
        height: 600,
      }}
      // {...viewState}
      {...DEFAULT_MAP_SETTING}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onLoad={(event) => {
        // const map = _.get(event, "target", undefined);
        // if (map === undefined) {
        //   return;
        // }
        // addResource(map);
      }}
      // onMove={(event) => {
      //   setViewState(event.viewState);
      //   const mapBounds = getMapBounds();
      //   if (props.onMapChange) {
      //     props.onMapChange(viewState, mapBounds);
      //   }
      // }}
      // onClick={(event) => {
      //   props.setMarker(event.lngLat);
      // }}
    >
      {/* <Marker
        longitude={props.marker.lng}
        latitude={props.marker.lat}
        draggable={false}
        color="red">
      </Marker> */}

      {featureCollection && (
        <Source
        type="geojson"
        data={featureCollection}>
  
        <Layer
          {...{
            type: "circle",
            paint: {
              "circle-radius": 10,
              "circle-color": "#0c7cbf"
            }
          }}
        />
      </Source>
      )}
    </ReactMap>
  );
};

export default SatelliteLayer;