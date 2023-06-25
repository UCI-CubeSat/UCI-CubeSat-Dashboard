import { env } from "@/service/env";
import { extractError } from "@/util/errorHandling";

export const getToken = async (tempId: string) => {
  const fetchResponse = await fetch(
    `${env.REACT_APP_SERVER_URL}/auth/get_token`,
    {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tempId,
      }),
    }
  );
  if (fetchResponse.ok) {
    return (await fetchResponse.json()) as { token: string };
  } else {
    await extractError(fetchResponse);
  }
};
