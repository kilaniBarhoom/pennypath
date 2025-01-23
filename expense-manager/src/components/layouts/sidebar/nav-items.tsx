import {
  Banknote,
  CreditCard,
  DollarSign,
  Home,
  Logs,
  Settings,
  TextSearch,
  User,
  UserCog,
} from "lucide-react";

export type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  unAuthorizedRoles?: string[];
};

export const SideNavItems: NavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home size={24} />,
    unAuthorizedRoles: [],
  },
  {
    title: "Wallets",
    path: "/wallets",
    icon: <CreditCard size={24} />,
    unAuthorizedRoles: ["spectator"],
  },
  {
    title: "Payments",
    path: "/payments",
    icon: <Banknote className="rotate-45" size={24} />,
    unAuthorizedRoles: ["spectator"],
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: <DollarSign size={24} />,
    unAuthorizedRoles: ["spectator"],
  },
];

export const SideNavSecondSectionItems: NavItem[] = [
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings size={24} />,
    unAuthorizedRoles: ["spectator"],
  },
  {
    title: "MyLogs",
    path: "/my-logs",
    icon: <TextSearch size={24} />,
    unAuthorizedRoles: ["spectator"],
  },
  {
    title: "Logs",
    path: "/logs",
    icon: <Logs size={24} />,
    unAuthorizedRoles: ["spectator", "user"],
  },
];

export const SideNavLastSectionItems: NavItem[] = [
  {
    title: "Profile",
    path: "/profile",
    icon: <User size={24} />,
    unAuthorizedRoles: ["spectator"],
  },
  {
    title: "Users",
    path: "/users",
    icon: <UserCog size={24} />,
    unAuthorizedRoles: ["user", "spectator"],
  },
];
