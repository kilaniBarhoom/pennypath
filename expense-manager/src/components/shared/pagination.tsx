import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
// import { useState } from "react";
import { ny } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TablePagiation = ({ totalPages }: { totalPages: number }) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams({
    PageSize: "30",
    PageNumber: "1",
  });

  const PageNumber = searchParams.get("PageNumber") || "1";

  const setPageNumber = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("PageNumber");
        if (value) prev.set("PageNumber", value);
        return prev;
      },
      { replace: true }
    );
  };

  const setPageSize = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("PageSize");
        if (value) prev.set("PageSize", value);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className="flex items-center gap-4 px-4 w-full max-sm:flex-col">
      <Pagination className="flex-1 w-full">
        <PaginationContent className="inline-flex items-center max-sm:w-full justify-between gap-2 shadow-sm shadow-black/5">
          {/* Previous page button */}
          <PaginationItem className="rounded-sm">
            <PaginationLink
              className={ny(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                }),
                " shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50"
              )}
              onClick={() => setPageNumber(String(Number(PageNumber) - 1))}
              aria-label="Go to previous page"
              aria-disabled={Number(PageNumber) === 1 ? true : undefined}
              role={Number(PageNumber) === 1 ? "link" : undefined}
            >
              <ChevronLeft
                className="w-5 h-5 rtl:rotate-180"
                strokeWidth={2}
                aria-hidden="true"
              />
            </PaginationLink>
          </PaginationItem>
          <p
            className=" whitespace-nowrap text-lg text-muted-foreground"
            aria-live="polite"
          >
            {t("Page")} <span className="text-foreground">{PageNumber}</span>{" "}
            {t("of")} <span className="text-foreground">{totalPages}</span>
          </p>
          {/* Next page button */}
          <PaginationItem className="rounded-sm">
            <PaginationLink
              className={ny(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                }),
                "shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50"
              )}
              onClick={() => setPageNumber(String(Number(PageNumber) + 1))}
              aria-label="Go to next page"
              aria-disabled={
                Number(PageNumber) === totalPages ? true : undefined
              }
              role={Number(PageNumber) === totalPages ? "link" : undefined}
            >
              <ChevronRight
                className="w-5 h-5 rtl:rotate-180"
                strokeWidth={2}
              />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="max-sm:w-full">
        <Select
          defaultValue="30"
          aria-label="Results per page"
          onValueChange={(e) => {
            setPageSize(e);
            setPageNumber("1");
          }}
        >
          <SelectTrigger
            id="results-per-page"
            className="w-fit whitespace-nowrap text-lg h-10 max-sm:w-full "
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 / {t("Page")}</SelectItem>
            <SelectItem value="10">10 / {t("Page")}</SelectItem>
            <SelectItem value="20">20 / {t("Page")}</SelectItem>
            <SelectItem value="30">30 / {t("Page")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TablePagiation;
