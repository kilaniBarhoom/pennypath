import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  NavItem,
  SideNavItems,
  SideNavLastSectionItems,
  SideNavSecondSectionItems,
} from "./nav-items";
import { ny } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { Dispatch, SetStateAction } from "react";

const NavElements = ({
  setOpen,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col gap-6 justify-between pb-2 flex-1 h-full">
      <div className="flex flex-col gap-2 flex-1">
        {SideNavItems.map(
          (item: NavItem) =>
            !item?.unAuthorizedRoles?.includes(user?.role ?? "") && (
              <Link
                to={item.path}
                key={item.title}
                onClick={() => {
                  setOpen?.(false);
                }}
                className={ny(
                  buttonVariants({
                    variant: pathname === item.path ? "navBtn" : "secondary",
                    size: "lg",
                  }),
                  "justify-between flex gap-2 p-2 hover:bg-primary/30 h-12 group border-primary items-center text-lg border font-normal ltr:border-l-[7px] rtl:border-r-[7px]"
                )}
              >
                {t(item.title)}
                {item.icon}
              </Link>
            )
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <span className="text-muted-foreground">{t("App")}</span>
        {SideNavSecondSectionItems.map(
          (item: NavItem) =>
            !item?.unAuthorizedRoles?.includes(user?.role ?? "") && (
              <Link
                to={item.path}
                key={item.title}
                onClick={() => {
                  setOpen?.(false);
                }}
                className={ny(
                  buttonVariants({
                    variant: pathname === item.path ? "navBtn" : "secondary",
                    size: "lg",
                  }),
                  "justify-between flex gap-2 p-2 hover:bg-primary/30 h-12 group border-primary items-center text-lg border font-normal ltr:border-l-[7px] rtl:border-r-[7px]"
                )}
              >
                {t(item.title)}
                {item.icon}
              </Link>
            )
        )}
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <span className="text-muted-foreground">{t("User")}</span>
        {SideNavLastSectionItems.map(
          (item: NavItem) =>
            !item?.unAuthorizedRoles?.includes(user?.role ?? "") && (
              <Link
                to={item.path}
                key={item.title}
                onClick={() => {
                  setOpen?.(false);
                }}
                className={ny(
                  buttonVariants({
                    variant: pathname === item.path ? "navBtn" : "secondary",
                    size: "lg",
                  }),
                  "justify-between flex gap-2 p-2 hover:bg-primary/30 h-12 group border-primary items-center text-lg border font-normal ltr:border-l-[7px] rtl:border-r-[7px]"
                )}
              >
                {t(item.title)}
                {item.icon}
              </Link>
            )
        )}
      </div>
    </nav>
  );
};

export default NavElements;
