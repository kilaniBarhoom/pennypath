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

declare type WalletType = {
  id: string;
  name: string;
  description: string;
  balance: number;
  color: string;
  currency: "USD" | "ILS" | "JOD";
  transactions: TransactionType[];
};

declare type TransactionType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: "expense" | "income" | "transfer";
};

declare type SearchWalletsResponseType = {
  wallets: WalletType[];
  from: Date;
  to: Date;
  totalBalance: number;
  currencySummary: {
    currency: string;
    total: number;
  }[];
  search: string;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  count: number;
};

declare type GetWalletAnalyticsResponseType = {
  analytics: {
    totalBalance: number;
    totalWallets: number;
    totalTransactions: number;
    incomeTransactions: number;
    expenseTransactions: number;
    transferTransactions: number;
    totalIncome: number;
    totalExpense: number;
    currencies: {
      currency: string;
      count: number;
      totalBalance: number;
    }[];
  };
  recentActivity: {
    _id: string;
    walletId: string;
    walletName: string;
    walletCurrency: string;
    transaction: TransactionType | null;
  }[];
  walletsByBalance: {
    name: string;
    balance: number;
    currency: string;
    createdAt: string;
    id: string;
  }[];
};
