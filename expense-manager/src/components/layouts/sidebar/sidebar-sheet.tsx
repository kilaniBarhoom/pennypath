import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SideBarContent } from ".";

const SideBarSheet = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
