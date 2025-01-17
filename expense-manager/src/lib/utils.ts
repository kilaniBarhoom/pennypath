import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function ny(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialsOfFullName(name: string | undefined) {
  let initials = " ";
  if (name) {
    const nameParts = name.split(" ");
    if (nameParts.length === 2) {
      initials = `${nameParts[0].charAt(0)} ${nameParts[1].charAt(0)}`;
    } else {
      initials = name.charAt(0);
    }
  }
  return initials;
}

export function getAccessTokenFromLS() {
  return localStorage.getItem("accessToken");
}

export const getToday = () => {
  const date = new Date();
  // set time to 00:00:00
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getLastDayOfCurrentMonthDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
  // set time to 23:59:59
  lastDay.setHours(0, 0, 0, 0);
  return lastDay;
};

export const getFirstDayOfCurrentMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
  // set time to 00:00:00
  firstDay.setHours(0, 0, 0, 0);
  return dateToString(firstDay);
};

export const getLastDayOfCurrentMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
  lastDay.setHours(0, 0, 0, 0);
  return dateToString(lastDay);
};

export const dateToString = (date: any) => {
  return format(Number(date), "y-LL-dd");
};

export const stringToDate = (string: any) => {
  return new Date(string);
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface removeUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: removeUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
