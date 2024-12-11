import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Languages } from "lucide-react";

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (data: any) => {
    i18n.changeLanguage(data);
  };
  return (
    <div className="flex h-12 items-center gap-2">
      <Button
        variant={"outline"}
        className="font-sans max-sm:px-2"
        // size="/
        Icon={Languages}
        onClick={() => changeLanguage(i18n.language === "ar" ? "en" : "ar")}
      >
        <span className="max-sm:sr-only">
          {i18n.language === "ar" ? t("English") : t("Arabic")}
        </span>
      </Button>
    </div>
  );
};

export default LanguageSelect;
