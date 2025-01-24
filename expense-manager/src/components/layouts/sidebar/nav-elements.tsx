import TooltipComponent from "@/components/shared/tooltip-component";
import { buttonVariants } from "@/components/ui/button";
import { ny } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  NavItem,
  SideNavItems,
  SideNavLastSectionItems,
  SideNavSecondSectionItems,
} from "./nav-items";

const NavElements = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex flex-col gap-16 justify-between pb-4 flex-1 h-full">
      <div className="flex flex-col gap-2">
        <RenderItems items={SideNavItems} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground">{t("App")}</span>
        <RenderItems items={SideNavSecondSectionItems} />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <span className="text-muted-foreground">{t("User")}</span>
        <RenderItems items={SideNavLastSectionItems} />
      </div>
    </nav>
  );
};

export default NavElements;

const RenderItems = ({ items }: { items: NavItem[] }) => {
  const { user } = useAuth();
  const { isSideBarOpen, setIsSideBarSheetOpen } = useSideBarTrigger();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return items.map((item: NavItem) =>
    !item?.unAuthorizedRoles?.includes(user?.role ?? "") ? (
      <TooltipComponent
        variant="invert"
        content={item.title}
        key={item.title}
        side="right"
      >
        <Link
          to={item.path}
          key={item.title}
          onClick={() => {
            setIsSideBarSheetOpen?.(false);
          }}
          className={ny(
            buttonVariants({
              variant: pathname === item.path ? "navBtn" : "ghost",
              size: isSideBarOpen ? "lg" : "icon",
            }),
            "flex w-full gap-2 p-2 items-center font-normal",
            isSideBarOpen ? "justify-start" : "justify-center"
          )}
        >
          {item.icon}
          <span className={ny(!isSideBarOpen && "lg:hidden")}>
            {t(item.title)}
          </span>
        </Link>
      </TooltipComponent>
    ) : null
  );
};
