import { ny } from "@/lib/utils";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import Header from "./header";
import { Outlet } from "react-router-dom";

export default function Main() {
  const { isSideBarOpen } = useSideBarTrigger();
  return (
    <main
      className={ny(
        {
          "lg:ps-[calc(16.5rem)]": isSideBarOpen,
          "lg:ps-[calc(4.5rem)]": !isSideBarOpen,
        },
        "flex-1 flex flex-col gap-2 overflow-auto min-w-0 transition-all duration-200 ease-in-out container max-lg:p-2"
      )}
    >
      <header className="bg-secondary border h-14 rounded-sm">
        <Header />
      </header>
      <Outlet />
    </main>
  );
}
