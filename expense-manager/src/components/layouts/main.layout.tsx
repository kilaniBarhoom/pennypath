import { ny } from "@/lib/utils";
import { SideBarTriggerProvider } from "@/providers/sidebar-trigger.provider";
import ScrollToTop from "../routing/scroll-to-top";
import SideBar from "./sidebar";
import Main from "./main";

export default function MainLayout() {
  return (
    <SideBarTriggerProvider>
      <div className="min-h-screen w-full flex gap-2 items-start bg-secondary/40">
        <ScrollToTop />
        <div className={ny("w-full p-2 rounded-sm")}>
          <SideBar />
          <Main />
        </div>
      </div>
    </SideBarTriggerProvider>
  );
}
