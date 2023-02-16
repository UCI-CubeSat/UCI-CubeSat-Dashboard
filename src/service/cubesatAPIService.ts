import { SERVER_URL } from "@/util/constant";
import { ParsedLogValidator } from "./cubsesatAPIService.validators";

type PostSatelliteLogsRequestBody = {
  // Both start and end are positive numbers where end is after start
  start: number,
  end: number
}
export const satelliteLogs = async ({ start, end }: PostSatelliteLogsRequestBody = { start: 1, end: Date.now() }) => {
  const fetchResponse = await fetch(`${SERVER_URL}/satellite/logList`,
    {
      method: "POST",
      body: JSON.stringify({
        start,
        end
      }),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    });
  const data = await fetchResponse.json();
  return ParsedLogValidator.parse(data);
};
