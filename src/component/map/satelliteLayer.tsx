/* eslint-disable*/

import React from 'react';
type Props = {
  isLoading: boolean,
  isError: boolean,
  allSateliteMap?: Map<string, unknown>,
}

const SatelliteLayer: React.FC<Props> = (props) => {
  const { isLoading, isError, allSateliteMap } = props
  if (isLoading || isError || !allSateliteMap) {
    return null
  }
  else {
    return (
      <React.Fragment>
        {/* {Array.from(allSateliteMap).map(([key, { latLng: { lat, lng }, latLngPath }], index) => (
          // <Source type="image" url={sateliteImage} coordinates={[[lat, lng]]}>
          // </Source>

          <React.Fragment key={`satelite-${index}-path`}>
            <Marker
              latitude={lat}
              longitude={lng}
            >
              <img src={sateliteImage} style={{ width: '50px' }} />
            </Marker>
            <Source
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                id: `satelite-${index}-path`,
                geometry: {
                  type: 'LineString',
                  coordinates: latLngPath
                }
              }}
            >
              <Layer
                id={`satelite-${index}-path`}
                type='line'
                source={`satelite-${index}-path`}
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
        ))} */}

      </React.Fragment>
    )
  }
};

export default SatelliteLayer;