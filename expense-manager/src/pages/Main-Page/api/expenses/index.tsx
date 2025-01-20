// import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { dateToString } from "@/lib/utils";
import { ExpenseFormSchemaType } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type SearchExpensesResponseType = {
  expenses: ExpenseType[];
  from: Date;
  to: Date;
  search: string;
  allTimeTotalValue: number;
  rageTotalValue: number;
  weekTotal: number;
  monthTotal: number;
  mostSpentInADay: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  totalExpenses: number;
};

export const useSearchExpensesQuery = () => {
  const axios = useAxios();

  // get employee id from query params
  const [searchParams] = useSearchParams();
  const PageSize = searchParams.get("PageSize") || "30";
  const PageNumber = searchParams.get("PageNumber") || "1";
  // const hasOverTime = searchParams.get("hasOverTime") || "";
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const amount = searchParams.get("amount");

  return useQuery({
    queryKey: [
      "expenses",
      {
        PageSize,
        PageNumber,
        from,
        to,
        search,
        amount,
        category,
      },
    ],
    queryFn: async () => {
      const dataToSend: any = {
        pageSize: +PageSize,
        pageNumber: +PageNumber,
        from: from,
        to: to,
        search: search,
        amount: amount,
        category: category,
      };
      if (from) {
        dataToSend["from"] = from;
      }
      if (to) {
        dataToSend["to"] = to;
      }
      if (search) {
        dataToSend["search"] = search;
      }
      if (amount) {
        dataToSend["amount"] = amount;
      }
      if (category) {
        dataToSend["category"] = category;
      }
      const { data: response } = await axios.get(`expense`, {
        params: dataToSend,
      });
      const { data } = response;
      return data as SearchExpensesResponseType;
    },
  });
};

export const useExpenseFormMutation = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: ({
      data,
      expenseId,
    }: {
      data: ExpenseFormSchemaType;
      expenseId?: string;
    }) => {
      if (!expenseId) {
        const dataToSend = {
          ...data,
          amount: data.amount ? +data.amount : 0,
          date: dateToString(data.date),
        };
        return axios.post(`expense`, dataToSend);
      } else {
        return axios.put(`expense/${expenseId}`, {
          ...data,
          amount: data.amount ? +data.amount : 0,
          date: dateToString(data.date),
          id: expenseId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });
};

export const useDeleteExpenseMutation = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: ({ expenseId }: { expenseId: string }) =>
      axios.delete(`expense/${expenseId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};

// using the following route: /Report/GetTotalCostsByTypeAndDateRange
