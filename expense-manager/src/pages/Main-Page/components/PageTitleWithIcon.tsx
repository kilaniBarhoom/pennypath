import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";

export default function PageTitleWithIcon({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <Typography
      className="flex items-center font-normal text-xl lg:text-4xl gap-2"
      element="p"
      color="secondary"
    >
      {icon}
      {t(title)}
    </Typography>
  );
}
