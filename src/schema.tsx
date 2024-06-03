import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be Atleast 8 Characters" }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be Atleast 4 Characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be Atleast 8 Characters" }),
});
