import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  DEFAULT_VIEW_STATE,
  DEFAULT_MAP_SETTING
} from '../util/constant';
import {
  getImage
} from '../util/helper';
import ReactMap, {
  Marker,
  FullscreenControl,
  NavigationControl,
  Source,
  Layer
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import icon from './../resource/icon.svg';
import {getPath} from '../service/cubesatAPIService';
// import SatelliteLayer from './satelliteLayer';

const FlightMap = (props) => {
  FlightMap.propTypes = {
    children: PropTypes.any,
    onMapChange: PropTypes.func,
    satelliteState: PropTypes.object
  };

  // eslint-disable-next-line no-unused-vars
  const pointLayer = () => {
    return {
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
      }
    };
  };

  const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
  const [pointData, setPointData] = useState(null);
  const mapReference = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const featureLayer = () => {
    return {
      type: 'Feature',
      id: `sample`,
      geometry: pointData,
      properties: {
        ['iconName']: 'icon'
      }
    };
  };

  // console.log(JSON.stringify(viewState));
  console.log(JSON.stringify(pointData));

  useEffect(() => {
    const animation = window.requestAnimationFrame(async() => {
      const pathResponse = await getPath();
      setPointData({
        type: 'Point',
        coordinates: [pathResponse['latLng']['lng'],
          pathResponse['latLng']['lat']]
      });
    });
    // Unmount
    return () => {
      window.cancelAnimationFrame(animation);
    };
  });

  useEffect(() => {
    const mapBounds = getMapBounds();
    if (props.onMapChange) {
      props.onMapChange(viewState, mapBounds);
    }
    return () => {
    };
  }, [viewState, props]);

  const getMapBounds = () => {
    const mapBounds = {
      northernLatitude: 0.0,
      easternLongitude: 0.0,
      southernLatitude: 0.0,
      westernLongitude: 0.0
    };

    if (mapReference.current) {
      const mapBounds = mapReference.current.getMap().getBounds();
      mapBounds.northernLatitude = mapBounds.getNorthEast().lat;
      mapBounds.easternLongitude = mapBounds.getNorthEast().lng;
      mapBounds.southernLatitude = mapBounds.getSouthWest().lat;
      mapBounds.westernLongitude = mapBounds.getSouthWest().lng;
    }

    return mapBounds;
  };

  const addResource = (map) => {
    getImage(icon, 24, 24).then((image) => {
      if (!map.hasImage('icon')) {
        console.log('adding image');
        map.addImage('icon', image, {sdf: true});
      }
    });
  };

  return (
    <ReactMap
      initialViewState={{
        longitude: DEFAULT_LONGITUDE,
        latitude: DEFAULT_LATITUDE,
        zoom: DEFAULT_ZOOM
      }}
      style={{
        width: 1080,
        height: 800
      }}
      {...viewState}
      {...DEFAULT_MAP_SETTING}
      mapStyle='mapbox://styles/mapbox/dark-v10'
      /* eslint-disable-next-line no-undef */
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onLoad={(event) => {
        const map = event.target;
        if (map === undefined) {
          return;
        }
        addResource(map);
      }}
      onMove={(event) => {
        setViewState(event.viewState);
        const mapBounds = getMapBounds();
        if (props.onMapChange) {
          props.onMapChange(viewState, mapBounds);
        }
      }}>

      <FullscreenControl
        position='bottom-right' />

      <NavigationControl
        position='bottom-right' />

      <Marker
        longitude={DEFAULT_LONGITUDE} latitude={DEFAULT_LATITUDE} color="red"
      />

      {pointData && (
        <Source type="geojson" data={pointData}>
          <Layer {...pointLayer()} />
        </Source>
      )}
    </ReactMap>
  );
};

export default FlightMap;
