import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
// import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ny } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "react-i18next";

const TablePagiation = ({ totalPages }: { totalPages: number }) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams({
    PageSize: "30",
    PageNumber: "1",
  });

  const PageSize = searchParams.get("PageSize") || "30";
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

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: Number(PageNumber),
    totalPages,
    paginationItemsToDisplay: Number(PageSize),
  });

  return (
    <div className="flex items-center gap-4 px-4 justify-center max-sm:w-full sm:ms-auto">
      <p
        className="flex-1 max-sm:sr-only whitespace-nowrap text-lg text-muted-foreground"
        aria-live="polite"
      >
        {t("Page")} <span className="text-foreground">{PageNumber}</span>{" "}
        {t("of")} <span className="text-foreground">{totalPages}</span>
      </p>
      <Pagination>
        <PaginationContent className="inline-flex gap-0 -space-x-px rounded-sm shadow-sm shadow-black/5 rtl:space-x-reverse">
          {/* Previous page button */}
          <PaginationItem className="[&:first-child>a]:rounded-s-sm [&:last-child>a]:rounded-e-sm">
            <PaginationLink
              className={ny(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                }),
                "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50"
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

          {/* Left ellipsis (...) */}
          {showLeftEllipsis && (
            <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page number links */}
          {pages.map((page) => {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  className={ny(
                    buttonVariants({
                      variant: "outline",
                      size: "icon",
                    }),
                    "rounded-none shadow-none focus-visible:z-10 text-primary-foreground",
                    page === Number(PageNumber) && "bg-primary hover:bg-primary"
                  )}
                  onClick={() => setPageNumber(String(page))}
                  isActive={page === Number(PageNumber)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Right ellipsis (...) */}
          {showRightEllipsis && (
            <PaginationItem className="[&:first-child>a]:rounded-s-sm [&:last-child>a]:rounded-e-sm">
              <PaginationEllipsis
                className={ny(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                  }),
                  "pointer-events-none rounded-none shadow-none"
                )}
              />
            </PaginationItem>
          )}

          {/* Next page button */}
          <PaginationItem className="[&:first-child>a]:rounded-s-sm [&:last-child>a]:rounded-e-sm">
            <PaginationLink
              className={ny(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                }),
                "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50"
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
      <div className="flex flex-1 justify-end">
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
            className="w-fit whitespace-nowrap text-lg h-10"
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent>
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
