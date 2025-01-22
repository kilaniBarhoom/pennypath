declare type UserType = {
  fullNameEnglish: string;
  fullNameArabic: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  role: string;
};

declare type ThemeType = "dark" | "light" | "system";

declare type LanguageType = "en" | "ar";

declare type AttendanceType = {
  id: string;
  date: string;
  status: "present" | "absent";
  attendanceTime: string;
  leaveTime: string;
  advancePayment: number;
  user: UserType;
  note: string;
  createdBy: UserType;
};

declare type UserGroupType = {
  role: string;
  users: UserType[];
};

declare type PaymentType = {
  id: string;
  date: string;
  amount: number;
  user: UserType;
  note: string;
  createdBy: UserType;
  type: "full" | "advance";
};

declare type ExpenseType = {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: Date;
  user: UserType;
  category: CategoryType;
  createdAt: string;
  updatedAt: string;
};

declare type CategoryType = {
  name: string;
  id: string;
};

declare type GroupedExpensesType = {
  _id: string;
  totalAmount: number;
  expenses: ExpenseType[];
};
