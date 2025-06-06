import { ny } from "@/lib/utils";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Main() {
  const { isSideBarOpen } = useSideBarTrigger();
  return (
    <main
      className={ny(
        {
          "lg:ps-[calc(16.5rem)]": isSideBarOpen,
          "lg:ps-[calc(4.5rem)]": !isSideBarOpen,
        },
        "flex-1 flex flex-col gap-4 overflow-auto min-w-0 transition-all duration-200 ease-in-out container max-lg:p-2"
      )}
    >
      <header className="bg-transparent border-b h-fit">
        <Header />
      </header>
      <Outlet />
    </main>
  );
}
