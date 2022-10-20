import { SERVER_URL } from "../util/constant";
import { getAvailableSatelliteValidator, getPredictionValidator, getPathValidator } from "./cubsesatAPIService.validators";
export const getPrediction = async (latLng: { lat: number, lng: number }, satellite: string) => {
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
    const response = await fetchResponse.json();
    return getPredictionValidator.parse(response)
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
    const response = await fetchResponse.json()
    return getAvailableSatelliteValidator.parse(response)
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
    const response = await fetchResponse.json()
    return getPathValidator.parse(response)
  } catch (error) {
    console.log(error);
    return [];
  }
};
