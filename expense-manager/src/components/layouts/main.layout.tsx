import { ny } from "@/lib/utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../routing/scroll-to-top";
import Header from "./header";
import SideBar from "./sidebar";
// import { Button } from "../ui/button";
// import Header from "./header/header";
// import SideNav from "./side-nav/side-nav";

export default function MainLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div className="min-h-screen w-full flex gap-2 items-start bg-background">
      <ScrollToTop />
      <div
        className={ny(
          "w-full p-2 rounded-sm  h-screen bg-secondary/40 overflow-auto"
        )}
      >
        <aside
          className={ny(
            {
              "w-[0rem] border-0": !isSideBarOpen,
              "w-[16rem] border": isSideBarOpen,
            },
            "max-xl:w-0 z-40 max-xl:max-w-0 overflow-hidden transition-all duration-200 ease-in-out min-h-screen fixed ltr:left-0 rtl:right-0 rounded-lg bg-secondary flex-shrink-0"
          )}
        >
          <SideBar />
        </aside>
        <main
          className={ny(
            {
              "xl:pl-[calc(16rem+8px)]": isSideBarOpen,
            },
            "flex-1 flex flex-col gap-2 min-w-0 transition-all duration-200 ease-in-out container max-lg:p-2"
          )}
        >
          <header className="bg-secondary border h-14 rounded-sm">
            <Header setIsSideBarOpen={setIsSideBarOpen} />
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
