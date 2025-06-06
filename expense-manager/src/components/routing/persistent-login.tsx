import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { getAuth, useAuth, useRefreshToken } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import LoadingComponent from "../shared/Loading-component";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const isLoggedIn = localStorage.getItem("isLoggedIn")?.toString() === "true";
  const { accessToken, setUser } = useAuth();
  const { setError } = useError();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        const user = await getAuth(newAccessToken);
        setUser(user);
      } catch (error: any) {
        if (error.code === "ERR_NETWORK") {
          setError({
            description:
              "Sorry, server unreachable at the moment. Try refreshing the browser",
          });
        } else if (error.response.status === 401) {
          setError({
            title: "Session Expired",
            description: "Please login again.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    !isLoggedIn || !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? (
    <LoadingComponent size={40} className="h-screen" />
  ) : (
    <Outlet />
  );
};

export default PersistentLogin;
