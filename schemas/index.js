import * as z from "zod";

export const UserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]),
});


export const ExpenseSchema = z.object({
    name: z.string().min(1, "Name must be at least 3 characters long"),
    description: z.string().max(400, "Description could be at maximun 400 characters long").optional(),
    amount: z.number().min(1, "Amount must be at least 1"),
    images: z.array(z.string()).optional(),
});

