/* eslint-disable*/
import sateliteImage from '@/assets/icon.svg';
import { Point } from '@/model/point';
import React from 'react';
import { Layer, Marker, Source } from 'react-map-gl';
type Props = {
  coordinates: Array<Point>,
}

const SatelliteLayer: React.FC<Props> = (props) => {
  const { coordinates } = props
  return (
    <React.Fragment >
      {coordinates.length > 0
        ?
        <React.Fragment>
          <Marker
            latitude={coordinates[0].lat}
            longitude={coordinates[0].lon}

          >
            <img src={sateliteImage} style={{ width: '50px' }} />
          </Marker>
          <Marker
            latitude={coordinates[coordinates.length - 1].lat}
            longitude={coordinates[coordinates.length - 1].lon}

          />
        </React.Fragment>

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
            coordinates: coordinates.map(({ lat, lon }) => [lon, lat])
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
              'line-width': 1
            }
          } />
      </Source>
    </React.Fragment>
  )
};

export default SatelliteLayer;