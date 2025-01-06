// import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type SearchAnalyticsResponseType = any;

export const useSearchAnalyticsQuery = () => {
  const axios = useAxios();

  // get employee id from query params
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  // const setFromDate = (from: Date) => {
  //   setSearchParams((prev) => {
  //     prev.delete("from");
  //     if (from) {
  //       prev.set("from", dateToString(from));
  //     }
  //     return prev;
  //   });
  // };

  return useQuery({
    queryKey: [
      "analytics",
      {
        from,
        to,
      },
    ],
    queryFn: async () => {
      const dataToSend: any = {
        from: from,
        to: to,
        // hasOverTime: hasOverTime === "true" && true,
      };
      if (from) {
        dataToSend["from"] = from;
      }
      if (to) {
        dataToSend["to"] = to;
      }
      const { data: response } = await axios.get(`analytics`, {
        params: dataToSend,
      });
      const { data } = response;
      return data as SearchAnalyticsResponseType;
    },
  });
};
