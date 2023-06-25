import { Log } from "@/model/log";
import { env } from "@/service/env";
import { extractError } from "@/util/errorHandling";
import { z } from "zod";
type PostTimeRangeRequestBody = {
  // Both start and end are positive numbers where end is after start
  start: number;
  end: number;
  token: string;
};
const PostTimeRangeResponseBodyValidator = z.object({
  logs: z.array(z.unknown()),
});

export const satellitesByTimeRange = async (body: PostTimeRangeRequestBody) => {
  const fetchResponse = await fetch(
    `${env.REACT_APP_SERVER_URL}/satellite/by_time_range`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );
  if (fetchResponse.ok) {
    const data = await fetchResponse.json();
    const response = PostTimeRangeResponseBodyValidator.parse(data);
    return { type: "timeRange" as const, logs: response.logs as Log[] };
  } else {
    await extractError(fetchResponse);
  }
};

type PostOffetRequestBody = {
  pageNo: number;
  count: number;
  token: string;
};
const PostOffsetResponseBodyValidator = z.object({
  logs: z.array(z.unknown()),
  numLogsBefore: z.number(),
  numLogsAfter: z.number(),
});

export const satellitesByOffset = async (body: PostOffetRequestBody) => {
  const fetchResponse = await fetch(
    `${env.REACT_APP_SERVER_URL}/satellite/by_offset`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );
  if (fetchResponse.ok) {
    const data = await fetchResponse.json();
    const response = PostOffsetResponseBodyValidator.parse(data);
    return {
      type: "offset" as const,
      logs: response.logs as Log[],
      numLogsAfter: response.numLogsAfter,
      numLogsBefore: response.numLogsBefore,
    };
  } else {
    await extractError(fetchResponse);
  }
};
