import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be Atleast 6 Characters" }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be Atleast 4 Characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be Atleast 6 Characters" }),
});
