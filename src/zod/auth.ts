import { z } from "zod";

export const authValidator = z.object({
  idToken: z.string().min(100),
});
