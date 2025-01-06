import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
interface IProps {
  status?: number;
  title?: string;
  children?: ReactNode;
}
const ErrorHandler = ({
  status = 500,
  title = "❌ Server Error",
  children,
}: IProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-[440px] p-6">
      <Typography
        element="span"
        color="secondary"
        className="text-9xl font-bold"
      >
        {status}
      </Typography>
      <h2 className="font-bold text-white">{t(title)}</h2>
      {children ?? (
        <Button onClick={() => navigate("/home")}>{t("Back To Home")}</Button>
      )}
    </div>
  );
};

export default ErrorHandler;
