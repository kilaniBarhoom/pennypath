import { Outlet } from "react-router-dom";
import AppLogo from "../shared/app-logo-combination";

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative p-4 w-full bg-background flex items-center justify-center">
      <header className="fixed top-0 border-b shadow-sm bg-background w-full p-4">
        <AppLogo />
      </header>

      <main className="max-w-sm mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
