import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be Atleast 6 Characters" }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Username must be Atleast 4 Characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be Atleast 6 Characters" }),
});

export const bookSchema = z.object({
  Title: z
    .string()
    .min(4, { message: "Title must be Atleast 4 Characters" }),
  Genre: z.string()
  .min(4, { message: "Genre must be Atleast 4 Characters" }),
  Description: z
    .string()
    .min(20, { message: "Description must be Atleast 20 Characters" }),
  CoverImage:z.instanceof(FileList).refine((file)=>{
    return file.length===1
  }, "CoverImage is required"),
  BookPdf:z.instanceof(FileList).refine((file)=>{
    return file.length===1
  }, "Book PDF is required")
});
