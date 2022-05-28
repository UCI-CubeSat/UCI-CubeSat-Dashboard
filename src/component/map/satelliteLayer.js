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
import {getAvailableSatellite, getPath} from "../../service/cubesatAPIService";
import { PageContext } from "../tab/navigationTab";
// import Logo from "../util/logo";
/* eslint-disable*/
import {Feature, FeatureCollection, GeoJsonProperties, Point, Position} from 'geojson';
import MapLayer from "./mapLayer"

export const satelliteLayerId = 'satellites';

const SatelliteLayer = (props) => {

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
      const availableSats = await getAvailableSatellite()
      console.log("available sats are: ", availableSats)
      for (let i in availableSats) {
        console.log("sat name: ", availableSats[i])
        const pathResponse = await getPath(availableSats[i]);

        console.log("pathResponse is:", pathResponse, "and the length is: ", Object.keys(pathResponse).length)
        if (Object.keys(pathResponse).length !== 0) {
          console.log("enter the if statement")
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
        }
        
      }
      

      setFeatureCollection({
        type: "FeatureCollection",
        features: features,
      })
    })

    return () => {
      window.cancelAnimationFrame(animation);
    };
  }, [featureCollection]);

  const addResource = (map) => {
    getImage(icon, 24, 24).then((image) => {
      if (!map.hasImage("icon")) {
        map.addImage("icon", image, { sdf: false });
      }
    });
  };

  if (featureCollection) {
    return (
      <Source
        type="geojson"
        data={featureCollection}>
  
        <Layer
          // {...{
          //   type: "circle",
          //   paint: {
          //     "circle-radius": 10,
          //     "circle-color": "#0c7cbf"
          //   }
          // }}
          {...{
            type: "symbol",
            layout: {
              "icon-image": "icon",
            },
          }}
        />
      </Source>
    )
  }
  //return (
    // <ReactMap
    //   initialViewState={{
    //     longitude: DEFAULT_LONGITUDE,
    //     latitude: DEFAULT_LATITUDE,
    //     zoom: DEFAULT_ZOOM,
    //   }}
    //   style={{
    //     width: 1080,
    //     height: 600,
    //   }}
    //   // {...viewState}
    //   {...DEFAULT_MAP_SETTING}
    //   mapStyle="mapbox://styles/mapbox/dark-v10"
    //   mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    //   onLoad={(event) => {
    //     if (props.map === undefined) {
    //       return;
    //     }
    //     addResource(props.map);
    //   }}
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
    // >
      /* {<Marker
        longitude={props.marker.lng}
        latitude={props.marker.lat}
        draggable={false}
        color="red">
      </Marker> } */

      // {featureCollection && (
      //   <Source
      //     type="geojson"
      //     data={featureCollection}>
    
      //     <Layer
      //       // {...{
      //       //   type: "circle",
      //       //   paint: {
      //       //     "circle-radius": 10,
      //       //     "circle-color": "#0c7cbf"
      //       //   }
      //       // }}
      //       {...{
      //         type: "symbol",
      //         layout: {
      //           "icon-image": "icon",
      //         },
      //       }}
      //     />
      //   </Source>
      // )}
    //</ReactMap>
  //);
};

export default SatelliteLayer;