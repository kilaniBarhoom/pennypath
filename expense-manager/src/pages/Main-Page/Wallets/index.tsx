import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Wallets = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Wallets</title>
      </Helmet>
      <BreadcrumbComponent tree={[{ title: "Wallets" }]} currentPage="All" />
      <div className="w-full h-80 flex items-center justify-center text-4xl text-secondary-foreground tracking-tight">
        <span>{t("Coming Soon")}</span>
      </div>
    </div>
  );
};

export default Wallets;
