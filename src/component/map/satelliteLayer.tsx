/* eslint-disable*/
import sateliteImage from '@/assets/icon.png';
import { Point } from '@/model/point';
import React from 'react';
import { Layer, Marker, Source } from 'react-map-gl';
type Props = {
  coordinates: Array<Point>,
}

const NUM_POINTS_ON_MAP = 20

const SatelliteLayer: React.FC<Props> = (props) => {
  const { coordinates } = props

  return (
    <React.Fragment >
      {coordinates.length > 0
        ?
        <Marker
          latitude={coordinates[0].lat}
          longitude={coordinates[0].lon}
        >
          <img src={sateliteImage} style={{ width: '50px' }} />
        </Marker>
        :
        null}
      <Source
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          id: `satelite-path`,
          geometry: {
            type: 'LineString',
            coordinates: coordinates.slice(0, NUM_POINTS_ON_MAP).map(({ lat, lon }) => [lat, lon])
          }
        }}
      >
        <Layer
          type='line'
          source={`satelite-path`}
          layout={{
            'line-join': 'round',
            'line-cap': 'round'
          }}
          paint={
            {
              'line-color': '#888',
              'line-width': 8
            }
          } />
      </Source>
    </React.Fragment>
  )
};

export default SatelliteLayer;