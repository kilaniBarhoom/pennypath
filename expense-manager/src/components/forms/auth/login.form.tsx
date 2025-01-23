import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axios } from "@/hooks/use-axios";
import { useAuth } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import { LoginFormSchema, LoginFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import LanguageSelectForm from "@/components/shared/LanguageSelect";
import ErrorAlert from "@/components/shared/error-alert";
import { ny } from "@/lib/utils";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
  const dir = i18n.dir();
  const language = i18n.language;

  const isLoading = loginForm.formState.isSubmitting;

  async function onSubmit(values: LoginFormSchemaType) {
    setError(undefined);
    try {
      const { data: response } = await axios.post(`/auth/login`, values);
      const { data } = response;
      const { user: userData, token } = data;
      const user: UserType = userData;
      setUser(user);
      setAccessToken(token);
      localStorage.setItem("isLoggedIn", "true");
      toast(
        t("Welcome back, {{name}}", {
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
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="flex flex-col text-start gap-3 w-full"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-red-500">*</span>
                {t("Email")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  noRing
                  autoComplete="email"
                  className="hover:border-primary focus-within:border-primary duration-500 border"
                  defaultValue="ibrahim-kelani@hotmail.com"
                  icon={<Mail size={20} />}
                  placeholder="john@doe.com"
                />
              </FormControl>
              <FormMessage className="text-start" />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-red-500">*</span>
                {t("Password")}
              </FormLabel>
              <FormControl>
                <Trans i18nKey={"passwordInput"}>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      noRing
                      autoComplete="password"
                      placeholder="********"
                      className="hover:border-primary focus-within:border-primary duration-500 border"
                    />
                    {showPassword ? (
                      <Eye
                        onClick={() => setShowPassword(false)}
                        size={23}
                        className={ny("cursor-pointer absolute top-2", {
                          "right-3": dir === "ltr",
                          "left-3": dir === "rtl",
                        })}
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setShowPassword(true)}
                        size={23}
                        className={ny("cursor-pointer absolute top-2", {
                          "right-3": dir === "ltr",
                          "left-3": dir === "rtl",
                        })}
                      />
                    )}
                  </div>
                </Trans>
              </FormControl>
              <FormMessage className="text-start" />
              <div className="text-end">
                <p>{t("Forgot your password?")}</p>
              </div>
            </FormItem>
          )}
        />
        <ErrorAlert />
        <div className="flex items-center justify-center gap-2 flex-col">
          <Button
            className=" w-full"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {t("Login")}
          </Button>
          <p className="text-sm text-secondary-foreground">
            {t("Don't have an account?")}{" "}
            <Link to="/register" className="text-primary">
              {t("register")}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
