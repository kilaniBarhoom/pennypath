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
      <div className={ny("w-full bg-secondary/40  p-2 rounded-sm")}>
        <aside
          className={ny(
            {
              "w-[0rem]": !isSideBarOpen,
              "w-[16rem]": isSideBarOpen,
            },
            "max-xl:w-0 z-40 max-xl:max-w-0 overflow-hidden bg-sidebar/40 transition-all duration-200 ease-in-out min-h-screen fixed ltr:left-0 rtl:right-0 top-0 bg-secondary flex-shrink-0"
          )}
        >
          <SideBar />
        </aside>
        <main
          className={ny(
            {
              "xl:pl-[calc(16rem+8px)]": isSideBarOpen,
            },
            "flex-1 flex flex-col gap-2 min-w-0 transition-all duration-200 ease-in-out max-w-screen-2xl w-full mx-auto"
          )}
        >
          <header className="bg-secondary/40 h-14 border rounded-sm">
            <Header setIsSideBarOpen={setIsSideBarOpen} />
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
