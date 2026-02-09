import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
});

export const projectSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional(),
});
