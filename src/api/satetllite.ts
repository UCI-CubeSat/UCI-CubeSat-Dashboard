import { ParsedLogValidator } from "@/model/log";
import { env } from "@/service/env";
import { z } from "zod";
type PostTimeRangeRequestBody = {
  // Both start and end are positive numbers where end is after start
  start: number,
  end: number
}
const PostTimeRangeResponseBodyValidator = z.object({
  logs: z.array(ParsedLogValidator)
})

export const satellitesByTimeRange = async ({ start, end }: PostTimeRangeRequestBody) => {
  const fetchResponse = await fetch(`${env.REACT_APP_SERVER_URL}/satellite/by_time_range`,
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
  return PostTimeRangeResponseBodyValidator.parse(data)
};

type PostPaginatedRequestBody = {
  type: "offset",
  index: number, // Indexed log is always included
  count: number,
} | {
  type: "cursor",
  cursor: number, // Cursor log is never provided
  count: number,
  direction: "forward" | "backward"
}
const PostPaginatedResponseBodyValidator = z.object({
  logs: z.array(ParsedLogValidator),
  numLogsBefore: z.number(),
  numLogsAfter: z.number()
})

export const satellitesByPagination = async (body: PostPaginatedRequestBody) => {
  const fetchResponse = await fetch(`${env.REACT_APP_SERVER_URL}/satellite/by_time_range`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    });
  const data = await fetchResponse.json();
  return PostPaginatedResponseBodyValidator.parse(data)
}
