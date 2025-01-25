import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import AppLogo from "../shared/app-logo-combination";

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative p-4 w-full bg-background flex items-center justify-center">
      <header className="fixed top-0 border-b shadow-sm bg-background w-full p-4">
        <AppLogo />
      </header>
      <motion.div
        initial={{ scale: 0.9, y: -100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <main className="max-w-sm mx-auto w-full">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
