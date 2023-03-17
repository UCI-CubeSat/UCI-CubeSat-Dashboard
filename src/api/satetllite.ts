import { ParsedLogValidator } from "@/model/log";
import { env } from "@/service/env";
import { extractError } from "@/util/errorHandling";
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
  if (fetchResponse.ok) {
    const data = await fetchResponse.json();
    return { type: "timeRange" as const, ...PostTimeRangeResponseBodyValidator.parse(data) }
  }
  else {
    await extractError(fetchResponse)
  }
};

type PostOffetRequestBody = {
  pageNo: number,
  count: number,
}
const PostOffsetResponseBodyValidator = z.object({
  logs: z.array(ParsedLogValidator),
  numLogsBefore: z.number(),
  numLogsAfter: z.number()
})

export const satellitesByOffset = async (body: PostOffetRequestBody) => {
  const fetchResponse = await fetch(`${env.REACT_APP_SERVER_URL}/satellite/by_offset`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    });
  if (fetchResponse.ok) {
    const data = await fetchResponse.json();
    return { type: "offset" as const, ...PostOffsetResponseBodyValidator.parse(data) }
  }
  else {
    await extractError(fetchResponse)
  }
}
