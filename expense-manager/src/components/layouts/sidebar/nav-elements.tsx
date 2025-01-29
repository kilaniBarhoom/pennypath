import AuthorizedRender from "@/components/shared/authorized-conditional-render";
import TooltipComponent from "@/components/shared/tooltip-component";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ny } from "@/lib/utils";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  NavItem,
  SideNavItems,
  SideNavLastSectionItems,
  SideNavSecondSectionItems,
} from "./nav-items";
import { NavUser } from "./nav-user";

const NavElements = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex flex-col gap-4 justify-between flex-1 h-fit">
      <TooltipComponent
        content="Upcoming Features"
        side="right"
        variant="invert"
      >
        <RenderItems
          items={[
            {
              title: "Upcoming Features",
              icon: <Lightbulb />,
              path: "/upcoming",
              authorizedRoles: ["user", "admin", "superadmin"],
            },
          ]}
          special
        />
      </TooltipComponent>
      <div className="flex flex-col gap-2">
        <Separator />
        <RenderItems items={SideNavItems} />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground">{t("App")}</span>

        <RenderItems items={SideNavSecondSectionItems} />
      </div>
      <Separator />

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground">{t("User")}</span>
        <RenderItems items={SideNavLastSectionItems} />
      </div>
      <Separator />
      <NavUser />
    </nav>
  );
};

export default NavElements;

const RenderItems = ({
  items,
  special,
}: {
  items: NavItem[];
  special?: boolean;
}) => {
  const { isSideBarOpen, setIsSideBarSheetOpen } = useSideBarTrigger();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return items.map((item: NavItem) => (
    <AuthorizedRender key={item.title} authorizedRoles={item.authorizedRoles}>
      <TooltipComponent
        variant="invert"
        content={item.title}
        key={item.title}
        side="right"
        inSideBar
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
              size: isSideBarOpen ? "default" : "icon",
            }),
            "flex justify-start mx-auto gap-2 p-2 max-md:w-full items-center font-normal",
            isSideBarOpen && "shadow-none w-full",
            special && "bg-primary text-primary-foreground border"
          )}
        >
          {item.icon}
          <span className={ny(!isSideBarOpen && "lg:hidden")}>
            {t(item.title)}
          </span>
        </Link>
      </TooltipComponent>
    </AuthorizedRender>
  ));
};
