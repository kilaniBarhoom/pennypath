import LoginForm from "@/components/forms/auth/login.form";
import Typography from "@/components/ui/typography";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <Helmet>
        <title>{t("Login")}</title>
      </Helmet>
      <div className="text-center flex items-center justify-start gap-2">
        <div className="content-center rounded-full bg-muted border p-2">
          <img
            src="/assets/attendance.png"
            alt="website logo"
            className="object-cover w-10"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <Typography
            element="p"
            as="h4"
            className="text-start font-normal"
            color="secondary"
          >
            {t("Login")}
          </Typography>
          <Typography element="p" as="mutedText" className="text-start">
            {t("Enter your credentials to access your account")}
          </Typography>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
