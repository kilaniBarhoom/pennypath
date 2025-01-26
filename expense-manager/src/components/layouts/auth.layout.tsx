import { Outlet } from "react-router-dom";
import AppLogo from "../shared/app-logo-combination";
import ThemeSelector from "../shared/theme-selector";

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative p-4 w-full bg-background flex items-center justify-center">
      <header className="fixed top-0 border-b shadow-sm bg-background flex items-center justify-between w-full p-4">
        <AppLogo />
        <ThemeSelector />
      </header>

      <main className="max-w-md  mx-auto w-full pt-10 grid gap-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
