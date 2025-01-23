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
import TooltipComponent from "@/components/shared/tooltip-component";

const NavElements = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex flex-col gap-6 justify-between pb-4 flex-1 h-full">
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
  const { isSideBarOpen, setIsSideBarOpen } = useSideBarTrigger();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return items.map((item: NavItem) =>
    !item?.unAuthorizedRoles?.includes(user?.role ?? "") ? (
      <TooltipComponent content={item.title} key={item.title} side="right">
        <Link
          to={item.path}
          key={item.title}
          onClick={() => {
            setIsSideBarOpen?.(false);
          }}
          className={ny(
            buttonVariants({
              variant: pathname === item.path ? "navBtn" : "secondary",
              size: isSideBarOpen ? "lg" : "icon",
            }),
            "flex justify-start w-full gap-2 p-2 hover:bg-primary/30 h-12 group border-primary items-center text-lg border font-normal ltr:border-l-[7px] rtl:border-r-[7px]"
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
