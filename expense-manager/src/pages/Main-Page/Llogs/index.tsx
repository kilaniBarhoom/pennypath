import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Logs = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Logs</title>
      </Helmet>
      <BreadcrumbComponent tree={[{ title: "Logs" }]} currentPage="My Logs" />
      <div className="w-full h-80 flex items-center justify-center text-4xl text-secondary-foreground tracking-tight">
        <span>{t("Coming Soon")}</span>
      </div>
    </div>
  );
};

export default Logs;
