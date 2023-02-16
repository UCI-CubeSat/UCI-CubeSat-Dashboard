import {
  DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_MAP_SETTING, DEFAULT_VIEW_STATE, DEFAULT_ZOOM
} from "@/util/constant";
import type { LatLng } from "@/util/general.types";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState } from "react";
import ReactMap, {
  FullscreenControl, NavigationControl
} from "react-map-gl";
import SatelliteLayer from "./satelliteLayer";

type Props = {
  marker: LatLng,
  setMarker: (arg0: LatLng) => void
  style?: React.CSSProperties
  isLoading: boolean,
  isError: boolean,
  data?: Map<string, unknown>
}





const MapLayer: React.FC<Props> = (props) => {
  const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);

  return (
    <ReactMap
      style={props.style}
      initialViewState={{
        longitude: DEFAULT_LONGITUDE,
        latitude: DEFAULT_LATITUDE,
        zoom: DEFAULT_ZOOM,
      }}
      {...viewState}
      {...DEFAULT_MAP_SETTING}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={import.meta.env.REACT_APP_MAPBOX_TOKEN}
      onMove={event => setViewState(event.viewState)}
    >
      <FullscreenControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
      <SatelliteLayer
        isError={props.isError}
        isLoading={props.isLoading}
        allSateliteMap={props.data}
      />
    </ReactMap>
  );
};

export default MapLayer;
