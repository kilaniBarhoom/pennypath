import { Menu } from "lucide-react";
import { Button } from "../ui/button";

import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import LanguageSelect from "../shared/language-select";
import ThemeSelector from "../shared/theme-selector";
import SideNavSheet from "./sidebar/sidebar-sheet";

const Header = () => {
  const { setIsSideBarOpen } = useSideBarTrigger();

  return (
    <div className="flex py-1 px-2 justify-between w-full items-center gap-4">
      <div className="flex items-center gap-2">
        <SideNavSheet>
          <Button className="lg:hidden flex" size="icon" variant="secondary">
            <Menu />
          </Button>
        </SideNavSheet>
        <Button
          onClick={() => {
            setIsSideBarOpen((prev: boolean) => !prev);
          }}
          className="max-lg:hidden"
          size="icon"
          variant="secondary"
        >
          <Menu />
        </Button>
        <LanguageSelect />
      </div>
      <ThemeSelector />
    </div>
  );
};

export default Header;
