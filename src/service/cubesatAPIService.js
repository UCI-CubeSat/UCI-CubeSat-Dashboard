// eslint-disable-next-line no-unused-vars
import { LOCAL_SERVER_URL, PROD_SERVER_URL } from "../util/constant";
const SERVER_URL = PROD_SERVER_URL;
// const SERVER_URL = LOCAL_SERVER_URL;

export const getPrediction = async (latLng, satellite) => {
  try {
    const fetchResponse = await fetch(`${SERVER_URL}/prediction?` +
        `satellite=${satellite}&latitude=${latLng.lat}&longitude=${latLng.lng}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    }
    );
    return await fetchResponse.json();
  } catch (error) {
    console.log(
        `${SERVER_URL}/prediction?` +
        `satellite=${satellite}&latitude=${latLng.lat}&longitude=${latLng.lng}`
    );
    console.log(error);
    return {};
  }
};

export const getAvailableSatellite = async () => {
  try {
    const fetchResponse = await fetch(`${SERVER_URL}/available_satellite`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    });
    return await fetchResponse.json();
  } catch (error) {
    console.log(`${SERVER_URL}/available_satellite`);
    console.log(error);
    return [];
  }
};

export const getPath = async () => {
  try {
    const fetchResponse = await fetch(`${SERVER_URL}/states?name=amicalsat`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    });
    return await fetchResponse.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
