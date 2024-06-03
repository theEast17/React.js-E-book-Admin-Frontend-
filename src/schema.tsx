import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be Atleast 8 Characters" }),
  });

