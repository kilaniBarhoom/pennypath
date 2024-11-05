import * as z from "zod";

export const UserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin", "spectator", "superadmin"]),
});


export const ExpenseSchema = z.object({
    name: z.string().min(1, "Name must be at least 3 characters long"),
    description: z.string().max(400, "Description could be at maximun 400 characters long").optional(),
    amount: z.number().min(1, "Amount must be at least 1"),
    images: z.array(z.string()).optional(),
});

// attendance schema
export const AttendanceSchema = z.object({
    status: z.enum(["present", "absent"]),
    advancePayment: z.number().min(0, "Advance payment must be at least 0"),
    leaveTime: z.string().optional(),
    attendanceTime: z.string().optional(),
    user: z.string().min(1, "User must be at least 1 characters long"),
    // date, a string and required, and has a regex pattern of: "22-10-2020"
    date: z.string().min(1, "Date is required").regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in the format of dd-mm-yyyy"),
});