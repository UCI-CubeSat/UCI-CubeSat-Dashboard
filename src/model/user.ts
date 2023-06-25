import { z } from "zod";

export const userSchema = z.object({
  email: z.string(),
  subscribed: z.boolean(),
  ip: z.string(),
  iat: z.number().int(),
  exp: z.number().int(),
});

export type User = z.infer<typeof userSchema>;
