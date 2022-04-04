/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {compose, withProps, withState, withHandlers} from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps';
import _ from 'lodash';
import {getAvailableSatellite, getPrediction} from './utils';
import Select from '@mui/material/Select';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import moment from 'moment';
import {
  DEFAULT_ZOOM,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE
} from './constant';

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const DEFAULT_CURSOR = {lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE};

const Prediction = () => {
  const [cursorLatLng, setCursorLatLng] =
      useState(DEFAULT_CURSOR);
  const [upcomingPass, setUpcomingPass] =
      useState({});
  const [dropdownSelect, setDropdownSelected] =
      useState('');
  const [satelliteList, setSatelliteList] =
      useState([]);
  const [isInitialized, setIsInitialized] =
      useState(false);

  if (!isInitialized) {
    getAvailableSatellite().then((data) => {
      setSatelliteList(data);
      setIsInitialized(true);
    });
  }

  const handleSelectorChange = (event) => {
    getPrediction({lat: _.get(cursorLatLng, 'lat', DEFAULT_CURSOR.lat),
      lng: _.get(cursorLatLng, 'lng', DEFAULT_CURSOR.lng)},
    dropdownSelect).then((prediction) => {
      setUpcomingPass(prediction);
    });
    setDropdownSelected(event.target.value);
  };

  const EmbeddedMap = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}} />,
        containerElement: <div style={{height: `400px`}} />,
        mapElement: <div style={{height: `100%`}} />
      }),
      withState('zoom', 'onZoomChange', DEFAULT_ZOOM),
      withHandlers(() => {
        const refs = {
          map: undefined
        };

        return {
          onMapMounted: () => ref => {
            refs.map = ref;
          },
          onZoomChanged: ({onZoomChange}) => () => {
            onZoomChange(refs.map.getZoom());
          }
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
          lng: mouseEvent.latLng.lng()
        });
        getPrediction(cursorLatLng, dropdownSelect).then((prediction) => {
          setUpcomingPass(prediction);
        });
      }}
    >
      {(<Marker position={cursorLatLng} />
      )}
    </GoogleMap>
  ));

  return <div className="Map">
    <EmbeddedMap />

    <FormControl sx={{m: 1, minWidth: 100}}>
      <InputLabel id="demo-simple-select-label" >Tracking Satellite</InputLabel>
      <Select
        labelId="satellite-selector"
        id="satellite-selector"
        value={dropdownSelect}
        label="Satellite"
        onChange={handleSelectorChange}
      >
        {_.map(_.range(satelliteList.length), (index) => (
          <MenuItem value={`${satelliteList[index]}`}>
            {`${satelliteList[index]}`}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <p className="Marker">Cursor location: <br></br>
      {`Latitude: ${cursorLatLng.lat} Longitude: ${cursorLatLng.lng}`} </p>

    <p className="Pass">Upcoming pass: </p>
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Peak Time</TableCell>
            <TableCell align="left">Rise Time</TableCell>
            <TableCell align="left">Set Time</TableCell>
            <TableCell align="left">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(upcomingPass, (value, key) => (
            <TableRow
              key={key}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell align="left">
                {moment(key).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                {moment(`${JSON.parse(value)['rise']}+00:00`)
                    .format('h:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                {moment(`${JSON.parse(value)['set']}+00:00`)
                    .format('h:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                {JSON.parse(value)['duration']}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
};

export default Prediction;
