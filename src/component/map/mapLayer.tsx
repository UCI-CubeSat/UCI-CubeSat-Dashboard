import { Point } from "@/model/point";
import { env } from "@/service/env";
import {
  DEFAULT_MAP_SETTING, DEFAULT_VIEW_STATE
} from "@/util/config";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import ReactMap, {
  FullscreenControl,
  NavigationControl
} from "react-map-gl";
import SatelliteLayer from "./satelliteLayer";

type Props = {
  style?: React.CSSProperties,
  coordinates: Array<Point>,
}





const MapLayer: React.FC<Props> = (props) => {
  const { coordinates } = props
  const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
  useEffect(() => {
    if (coordinates.length > 0) {
      setViewState({
        ...viewState,
        latitude: coordinates[0].lat,
        longitude: coordinates[0].lon
      })
    }
  }, [coordinates])
  return (
    <ReactMap
      reuseMaps
      style={props.style}
      {...viewState}
      {...DEFAULT_MAP_SETTING}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={env.REACT_APP_MAPBOX_TOKEN}
      onMove={event => setViewState(event.viewState)}
    >
      <FullscreenControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
      <SatelliteLayer
        coordinates={coordinates}
      />
    </ReactMap>
  );
};

export default MapLayer;


const mapLayerArePropsEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.coordinates === nextProps.coordinates && prevProps.style === nextProps.style
}

export const MemoMapLayer = React.memo(MapLayer, mapLayerArePropsEqual)
