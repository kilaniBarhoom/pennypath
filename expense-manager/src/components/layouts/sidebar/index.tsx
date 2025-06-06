import AppLogo from "@/components/shared/app-logo-combination";
import { ny } from "@/lib/utils";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import NavElements from "./nav-elements";

const SideBar = () => {
  const { isSideBarOpen } = useSideBarTrigger();

  return (
    <aside
      className={ny(
        {
          "w-[4rem] border-0": !isSideBarOpen,
          "w-[16rem] border-r": isSideBarOpen,
        },
        "max-lg:w-0 z-40 max-lg:max-w-0 overflow-hidden lg:overflow-auto transition-all duration-200 ease-in-out fixed inset-0 h-screen bg-secondary/30 flex-shrink-0 no-scrollbar"
      )}
    >
      <SideBarContent />
    </aside>
  );
};

export default SideBar;

export const SideBarContent = () => {
  const { isSideBarOpen } = useSideBarTrigger();

  return (
    <div className="flex flex-col gap-4 p-2 h-full overflow-y-auto no-scrollbar">
      <AppLogo smallLogo={!isSideBarOpen} />
      <NavElements />
    </div>
  );
};
