import {
  Banknote,
  // CreditCard,
  DollarSign,
  Home,
  // Settings,
  // TextSearch,
  // User,
  UserCog,
} from "lucide-react";

export type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  authorizedRoles: string[];
};

export const SideNavItems: NavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home size={24} />,
    authorizedRoles: ["user", "admin", "superadmin"],
  },
  // {
  //   title: "Wallets",
  //   path: "/wallets",
  //   icon: <CreditCard size={24} />,
  //   authorizedRoles: ["user", "admin", "superadmin"],
  // },
  {
    title: "Payments",
    path: "/payments",
    icon: <Banknote size={24} />,
    authorizedRoles: ["user", "admin", "superadmin"],
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: <DollarSign size={24} />,
    authorizedRoles: ["user", "admin", "superadmin"],
  },
];

export const SideNavSecondSectionItems: NavItem[] = [
  // {
  //   title: "My Logs",
  //   path: "/my-logs",
  //   icon: <TextSearch size={24} />,
  //   authorizedRoles: ["user", "admin", "superadmin"],
  // },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: <Settings size={24} />,
  //   authorizedRoles: ["user", "admin", "superadmin"],
  // },
  // {
  //   title: "Logs",
  //   path: "/logs",
  //   icon: <Logs size={24} />,
  //   authorizedRoles: ["spectator", "user"],
  // },
];

export const SideNavLastSectionItems: NavItem[] = [
  // {
  //   title: "Profile",
  //   path: "/profile",
  //   icon: <User size={24} />,
  //   authorizedRoles: ["user", "admin", "superadmin"],
  // },
  {
    title: "Users",
    path: "/users",
    icon: <UserCog size={24} />,
    authorizedRoles: ["admin", "superadmin"],
  },
];
