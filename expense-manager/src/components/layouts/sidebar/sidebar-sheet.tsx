import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import React from "react";
import { useTranslation } from "react-i18next";
import { SideBarContent } from ".";

const SideBarSheet = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarSheetOpen, setIsSideBarSheetOpen } = useSideBarTrigger();
  const { i18n } = useTranslation();
  return (
    <Sheet open={isSideBarSheetOpen} onOpenChange={setIsSideBarSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={i18n.dir() === "rtl" ? "right" : "left"}
        className="md:w-[60] w-full p-4"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SideBarContent />
      </SheetContent>
    </Sheet>
  );
};

export default SideBarSheet;
