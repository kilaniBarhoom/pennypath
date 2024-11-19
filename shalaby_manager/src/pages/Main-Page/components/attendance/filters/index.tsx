import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { dateToString } from "@/lib/utils";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

// import { useEffect, useState } from "react";
const AttendanceFilters = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const [searchParams, setSearchParams] = useSearchParams();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const setDateRange = (from: string, to: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");
      if (from) prev.set("from", from);
      if (to) prev.set("to", to);
      return prev;
    });
  };

  return (
    <div className="min-w-max">
      <DateRangePicker
        showCompare={false}
        onUpdate={({ range }) => {
          setDateRange(dateToString(range.from), dateToString(range.to));
        }}
        locale={language}
      />
      {(from || to) && (
        <Badge className="items-center hidden gap-2 rounded-full" size={"sm"}>
          {from} - {to}
          <Button
            size={"xs"}
            variant={"hover"}
            className="rounded-full"
            onClick={() => {
              setDateRange("", "");
            }}
          >
            <X size={16} />
          </Button>
        </Badge>
      )}
    </div>
  );
};

export default AttendanceFilters;
