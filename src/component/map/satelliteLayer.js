/* eslint-disable*/
import React, {useEffect, useRef, useState} from 'react';
import {Layer, Source} from 'react-map-gl';
import {Feature, FeatureCollection, GeoJsonProperties, Point, Position} from 'geojson';

export const satelliteLayerId = 'satellites';

const SatelliteLayer = (props) => {
  const [features, setFeatures] = useState(undefined);
  const [path, setPath] = useState([]);

  useEffect(() => {

  })

  return (
    <Source
      type="geojson"
      data={featureCollection}>

      <Layer
        id={satelliteLayerId}
        type='symbol'
        source='geojson'
        layout=""
        paint="" />
    </Source>
  );
};

export default SatelliteLayer;
