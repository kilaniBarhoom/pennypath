import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export default function TooltipComponent({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-sm">
          {t(content)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
