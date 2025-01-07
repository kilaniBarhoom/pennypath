import { Home, User2, Banknote, DollarSign } from "lucide-react";

export type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  unAuthorizedRoles?: string[];
};

export const SideNavItems: NavItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <Home size={24} />,
    unAuthorizedRoles: [],
  },
  // {
  //   title: "Attendance",
  //   path: "/attendance",
  //   icon: <School2 size={24} />,
  //   unAuthorizedRoles: [],
  // },
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
  {
    title: "Users",
    path: "/users",
    icon: <User2 size={24} />,
    unAuthorizedRoles: ["user", "spectator"],
  },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <Settings
  //       className="group-hover:rotate-180 transition-all duration-200 ease-in-out"
  //       size={24}
  //     />
  //   ),
  //   unAuthorizedRoles: ["user", "spectator", "admin"],
  // },
];
