import { useLogout } from "@/providers/auth-provider";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { useTranslation } from "react-i18next";
import LanguageSelect from "../shared/language-select";
import ThemeSelector from "../shared/theme-selector";
import SideNavSheet from "./sidebar/sidebar-sheet";
import { useQueryClient } from "@tanstack/react-query";

const Header = ({
  setIsSideBarOpen,
}: {
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const isConfirmed = confirm(t("Are you sure you want to logout?"));

    if (isConfirmed) {
      queryClient.invalidateQueries();
      await logout();
      navigate("/");
    }
  };
  return (
    <div className="flex py-1 px-2 justify-between w-full items-center gap-4">
      <div className="flex items-center gap-2">
        <SideNavSheet>
          <Button className="xl:hidden flex" size="icon" variant="secondary">
            <Menu />
          </Button>
        </SideNavSheet>
        <Button
          onClick={() => {
            setIsSideBarOpen((prev: boolean) => !prev);
          }}
          className="max-xl:hidden"
          size="icon"
          variant="secondary"
        >
          <Menu />
        </Button>
        <LanguageSelect />
      </div>
      <div className="flex items-center gap-2 relative">
        <ThemeSelector />
        <Button
          onClick={handleLogout}
          variant={"destructive"}
          className="max-sm:px-2"
          Icon={LogOut}
        >
          <span className="max-sm:sr-only">{t("Log Out")}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
