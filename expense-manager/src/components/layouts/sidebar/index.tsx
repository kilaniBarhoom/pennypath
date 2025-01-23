import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import { ny } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavElements from "./nav-elements";
import TooltipComponent from "@/components/shared/tooltip-component";

const SideBar = () => {
  const { isSideBarOpen } = useSideBarTrigger();

  return (
    <aside
      className={ny(
        {
          "w-[4rem] border-0": !isSideBarOpen,
          "w-[16rem] border": isSideBarOpen,
        },
        "max-lg:w-0 z-40 max-lg:max-w-0 overflow-hidden lg:overflow-auto transition-all duration-200 ease-in-out fixed start-2 rounded-lg bg-secondary flex-shrink-0 no-scrollbar"
      )}
    >
      <SideBarContent />
    </aside>
  );
};

export default SideBar;

export const SideBarContent = () => {
  const { isSideBarOpen } = useSideBarTrigger();

  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2 lg:p-2 lg:h-screen  overflow-visible">
      <div className="flex flex-col bg-muted border rounded-lg w-full">
        <div className="flex flex-col w-full py-2 gap-2 items-center justify-center">
          <TooltipComponent side="right" content="User Profile">
            <Avatar
              className={ny("size-28 cursor-pointer", {
                "lg:size-8": !isSideBarOpen,
              })}
            >
              <AvatarImage src="/assets/userprofile.png" />
              <AvatarFallback>
                {user?.fullNameEnglish?.[0]?.toString().toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </TooltipComponent>
          <Typography
            element="p"
            as="smallText"
            className={ny(!isSideBarOpen && "lg:hidden")}
          >
            {t("Welcome")},&nbsp;
            {lang === "ar" ? user?.fullNameArabic : user?.fullNameEnglish}
          </Typography>
        </div>
        <div
          className={ny(
            "w-full px-2 py-1 bg-green-500 rounded-b-md",
            !isSideBarOpen && "lg:hidden"
          )}
        >
          <Typography
            element="span"
            as="smallText"
            className="font-semibold text-center flex justify-center items-center"
            color="black"
          >
            {format(currentTime, "eee, dd/MM/y, HH:mm", {
              locale: lang === "ar" ? ar : enGB,
            })}
          </Typography>
        </div>
      </div>
      <NavElements />
    </div>
  );
};
