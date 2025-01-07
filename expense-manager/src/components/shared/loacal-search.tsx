import { Group, NumberField } from "react-aria-components";

import { Input } from "@/components/ui/input";
import { formUrlQuery, ny, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
// import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface CustomInputProps {
  route: string;
  placeholder: string;
  otherClasses?: string;
  Icon?: any;
  searchQuery?: string;
  variant?: string;
}

const LocalSearchBar = ({
  route,
  placeholder,
  otherClasses,
  Icon,
  searchQuery = "q",
  variant = "search",
}: CustomInputProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const query = searchParams.get(searchQuery);

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: searchQuery,
          value: search,
        });
        navigate(newUrl, { replace: true });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: [searchQuery],
          });
          searchParams.delete(searchQuery);
          navigate(newUrl, { replace: true });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search, route, pathname, searchParams]);

  return (
    <div className="p-5 bg-secondary border flex items-center gap-10 justify-center rounded-md">
      {variant === "search" ? (
        <>
          <span className="text-2xl max-lg:hidden">{t("Search: ")}</span>
          <Input
            aria-label="search"
            type="text"
            placeholder={t(placeholder)}
            value={search}
            icon={
              Icon ? (
                <Icon size={20} className="mt-2" />
              ) : (
                <Search size={20} className="mt-2" />
              )
            }
            onChange={(e) => setSearch(e.target.value)}
            className={ny(
              "md:min-w-96 font-normal bg-muted h-12 text-lg border-secondary-foreground/20",
              otherClasses
            )}
          />
        </>
      ) : (
        <NumberField
          defaultValue={undefined}
          formatOptions={{
            style: "currency",
            currency: "ILS",
            currencySign: "accounting",
          }}
          aria-label="amount"
        >
          <Group className="relative inline-flex h-10 w-fit items-center overflow-hidden whitespace-nowrap rounded-sm border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
            <Input
              aria-label="search"
              placeholder={placeholder}
              value={search}
              min={0}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="number"
              className="flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none border-0"
            />
          </Group>
        </NumberField>
      )}
    </div>
  );
};
export default LocalSearchBar;
