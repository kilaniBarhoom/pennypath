import { axios } from "@/hooks/use-axios";
import { useAuth } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import {
  LoginFormSchemaType,
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import LanguageSelectForm from "@/components/shared/LanguageSelect";
import UsersForm from "../main-page/users/add-edit-form";

const RegisterForm = () => {
  const registerForm = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullNameArabic: "",
      fullNameEnglish: "",
      email: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.state?.from?.pathname;
  const search = location.state?.from?.search;
  const from =
    pathname && !["/unauthorized"].includes(pathname)
      ? `${pathname}${search}`
      : "/dashboard";
  const { user, setUser, setAccessToken } = useAuth();
  const { setError } = useError();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  async function onSubmit(values: LoginFormSchemaType) {
    setError(undefined);
    try {
      const { data: response } = await axios.post(`/auth/register`, values);
      const { data } = response;
      const { user: userData, token } = data;
      const user: UserType = userData;
      setUser(user);
      setAccessToken(token);
      localStorage.setItem("isLoggedIn", "true");
      toast(
        t("Welcome, {{name}}", {
          name:
            language === "ar" ? user?.fullNameArabic : user?.fullNameEnglish,
        }),
        {}
      );
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        setError({
          description:
            "Sorry, server unreachable at the moment. Try refreshing the browser",
        });
      } else {
        console.log(error.response.data.message);
        setError({
          description: error.response.data.message,
        });
      }
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <UsersForm onSubmit={onSubmit} userForm={registerForm} />
    // <div className="w-fit mt-6">
    //   {/* <LanguageSelectForm className="lg:w-1/2 text-white hover:text-white text-lg" /> */}
    // </div>
  );
};

export default RegisterForm;
