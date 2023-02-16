import { z } from "zod";

const EnvValidator = z.object({
    REACT_APP_MAPBOX_TOKEN: z.string().min(1),
    REACT_APP_SERVER_URL: z.string().min(1)
})

export const env = EnvValidator.parse(import.meta.env)