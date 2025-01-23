import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ny } from "@/lib/utils";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import { useTranslation } from "react-i18next";

export default function TooltipComponent({
  content,
  side = "top",
  children,
}: {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const { isSideBarOpen } = useSideBarTrigger();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          side={side}
          className={ny("px-2 py-1", isSideBarOpen && "lg:hidden")}
        >
          {t(content)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
