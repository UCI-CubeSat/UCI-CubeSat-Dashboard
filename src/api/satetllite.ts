import { ParsedLogValidator } from "@/model/log";
import { env } from "@/service/env";
import { z } from "zod";
type PostSatelliteLogsRequestBody = {
  // Both start and end are positive numbers where end is after start
  start: number,
  end: number
}
const PostSatelliteLogsResponseBodyValidator = z.object({
  logs: z.array(ParsedLogValidator)
})

export const satelliteLogs = async ({ start, end }: PostSatelliteLogsRequestBody) => {
  const fetchResponse = await fetch(`${env.REACT_APP_SERVER_URL}/satellite/logList`,
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
  return PostSatelliteLogsResponseBodyValidator.parse(data)
};
