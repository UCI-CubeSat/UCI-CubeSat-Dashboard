import { SERVER_URL } from "@/util/constant";
import { LatLng } from "@/util/general.types";
import { z } from "zod";
import { getAvailableSatelliteValidator, getPathValidator, getPredictionValidator, ParsedLogValidator } from "./cubsesatAPIService.validators";
// export const getPrediction = async (latLng: LatLng, satellite: string) => {
//   try {
//     const fetchResponse = await fetch(`${SERVER_URL}/prediction?` +
//       `satellite=${satellite}&latitude=${latLng.lat}&longitude=${latLng.lng}`,
//       {
//         method: "GET",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//           "accept": "application/json",
//         },
//       }
//     );
//     const response = await fetchResponse.json();
//     return getPredictionValidator.parse(response)
//   } catch (error) {
//     console.log(
//       `${SERVER_URL}/prediction?` +
//       `satellite=${satellite}&latitude=${latLng.lat}&longitude=${latLng.lng}`
//     );
//     console.log(error);
//     return {};
//   }
// };

// export const getAvailableSatellite = async (signal?: AbortSignal) => {
//   try {
//     const fetchResponse = await fetch(`${SERVER_URL}/satellite/logList`, {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         "accept": "application/json",
//       },
//       signal
//     });
//     const response = await fetchResponse.json()
//     return getAvailableSatelliteValidator.parse(response)
//   } catch (error) {
//     console.log(`${SERVER_URL}/satellite/logList`);
//     console.log(error);
//     return [];
//   }
// };

export const getAvailableSatellite = async (signal?: AbortSignal) => {
  try {
    const fetchResponse = await fetch(`${SERVER_URL}/satellite/logList`,
      {
        method: "POST",
        body: JSON.stringify({
          'start': 1,
          // 'end': Date.now()
          'end': 3
        }),
        headers: {
                  "Content-Type": "application/json",
                  "accept": "application/json",
                },
      });
    const data = await fetchResponse.json();
    console.log(data);
    return ParsedLogValidator.parse(data);
  }
  catch (error) {
    console.log(error);
    return [];
  }
};

// export const getPath = async (name: string, signal?: AbortSignal) => {
//   const fetchResponse = await fetch(`${SERVER_URL}/states?name=${name}`, {
//     method: "GET",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//       "accept": "application/json",
//     },
//   });
//   const response = await fetchResponse.json()
//   return getPathValidator.parse(response)
// };
