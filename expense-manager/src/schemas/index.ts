import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const AttendanceFormSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  attendanceTime: z.string().optional(),
  leaveTime: z.string().optional(),
  user: z.string().min(1, "User is required"),
  status: z.string().min(1, "Status is required"),
  advancePayment: z.string().default("0"),
  note: z.string().optional(),
});

export type AttendanceFormSchemaType = z.infer<typeof AttendanceFormSchema>;

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, "Old Password is required"),
    newPassword: z.string().min(1, "New Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormSchemaType = z.infer<
  typeof ChangePasswordFormSchema
>;

export const RegisterFormSchema = z.object({
  fullNameEnglish: z.string().min(1, "Full name in english is required"),
  fullNameArabic: z.string().min(1, "Full name in arabic is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

// same user schema but without password
export const UsersEditFormSchema = z.object({
  fullNameEnglish: z.string().min(1, "Full name in english is required"),
  fullNameArabic: z.string().min(1, "Full name in arabic is required"),
  email: z.string().min(1, "Email is required").email(),
});

export type UsersEditFormSchemaType = z.infer<typeof UsersEditFormSchema>;

export const PaymentFormSchema = z.object({
  amount: z.number().positive().gt(0),
  date: z.date({
    required_error: "Date is required",
  }),
  note: z.string().optional(),
  type: z.enum(["advance", "full"]),
});

export type PaymentFormSchemaType = z.infer<typeof PaymentFormSchema>;
//

const CategoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema>;

export const ExpenseFormSchema = z.object({
  name: z.string().min(1, "Expense name is required"),
  description: z.string().optional(),
  amount: z.number().positive().gt(0),
  date: z.date({
    required_error: "Date is required",
  }),
  category: z.string().min(1, "Category is required"),
});

export type ExpenseFormSchemaType = z.infer<typeof ExpenseFormSchema>;

//
