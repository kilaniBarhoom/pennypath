import { ny } from "@/lib/utils";
import { SideBarTriggerProvider } from "@/providers/sidebar-trigger.provider";
import ScrollToTop from "../routing/scroll-to-top";
import Main from "./main";
import SideBar from "./sidebar";

export default function MainLayout() {
  return (
    <SideBarTriggerProvider>
      <div className="min-h-screen w-full flex gap-2 items-start bg-secondary/40">
        <ScrollToTop />
        <div className={ny("w-full p-2 rounded-sm flex")}>
          <SideBar />
          <Main />
        </div>
      </div>
    </SideBarTriggerProvider>
  );
}
