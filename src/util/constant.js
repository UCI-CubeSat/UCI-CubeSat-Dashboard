export const PROD_SERVER_URL =
  "https://uci-cubesat-server.herokuapp.com/api/v1";
export const LOCAL_SERVER_URL = "http://127.0.0.1:5000/api/v1";
export const DEFAULT_ZOOM = 8;
export const DEFAULT_LATITUDE = 33.6405;
export const DEFAULT_LONGITUDE = -117.8443;
export const DEFAULT_CURSOR = {
  lat: DEFAULT_LATITUDE,
  lng: DEFAULT_LONGITUDE,
};
export const DEFAULT_VIEW_STATE = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  zoom: DEFAULT_ZOOM,
  bearing: 0,
  pitch: 0,
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
export const DEFAULT_MAP_SETTING = {
  dragPan: true,
  dragRotate: false,
  scrollZoom: true,
  keyboard: true,
  doubleClickZoom: true,
  minZoom: 0,
  maxZoom: 20,
  minPitch: 0,
  maxPitch: 85,
};
