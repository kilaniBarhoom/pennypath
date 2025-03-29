import * as z from "zod";

export const UserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});
export const RegisterSchema = z.object({
    fullNameArabic: z.string().min(3),
    fullNameEnglish: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});


export const ExpenseSchema = z.object({
    name: z.string().min(1, "Name must be at least 3 characters long").trim(),
    description: z.string().max(400, "Description could be at maximun 400 characters long").optional(),
    amount: z.number().min(1, "Amount must be at least 1"),
    date: z.date({
        required_error: "Date is required",
    }),
    category: z.string().min(1, "Exppense must belong to a category"),
});

export const CategorySchema = z.object({
    name: z.string().min(1, "Name must be at least 3 characters long").trim(),
    description: z.string().max(400, "Description could be at maximun 400 characters long").optional(),
});

// attendance schema
export const AttendanceSchema = z.object({
    status: z.enum(["present", "absent"]),
    advancePayment: z.number().min(0, "Advance payment must be at least 0"),
    leaveTime: z.string().optional(),
    attendanceTime: z.string().optional(),
    user: z.string().min(1, "User must be at least 1 characters long"),
    date: z.date({
        required_error: "Date is required",
    }),
    // date: z.string().min(1, "Date is required").regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format of yyyy-mm-dd"),
    note: z.string().optional(),
});

export const PaymentSchema = z.object({
    amount: z.number().min(0, "Advance payment must be at least 0"),
    date: z.date({
        required_error: "Date is required",
    }),
    note: z.string().optional(),
    type: z.enum(["advance", "full"]),
});

// Wallet Schema
export const WalletSchema = z.object({
    name: z.string().min(1, "Wallet name is required").trim(),
    balance: z.number().default(0),
    currency: z.string().min(1, "Currency is required").default("ILS")
});

// Transaction Schema
export const TransactionSchema = z.object({
    date: z.date({
        required_error: "Date is required",
    }),
    description: z.string().max(400, "Description could be at maximum 400 characters long").optional(),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    type: z.enum(['income', 'expense', 'transfer'], {
        required_error: "Transaction type must be income, expense, or transfer"
    }),
    category: z.string().min(1, "Transaction must belong to a category")
});

// Transfer Schema
export const TransferSchema = z.object({
    sourceWalletId: z.string().min(1, "Source wallet ID is required"),
    destinationWalletId: z.string().min(1, "Destination wallet ID is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    description: z.string().max(400, "Description could be at maximum 400 characters long").optional()
});

export const SettingsSchema = z.object({
    attendanceType: z.enum(["dateOnly", "checkinchekout"]),
});
