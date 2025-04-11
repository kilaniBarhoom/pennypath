// import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { dateToString } from "@/lib/utils";
import { ExpenseFormSchemaType } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type ExpenseApiParams = {
  pageSize: number;
  pageNumber: number;
  from?: string | null;
  to?: string | null;
  search?: string | null;
  amount?: string | null; // Keep as string if API expects it, otherwise parse
  category?: string | null;
  groupby?: string | null; // Added groupby parameter
};

type ExpenseGroup = {
  groupKey: string | number; // The value grouped by (e.g., "YYYY-MM-DD" date string or category ID)
  totalAmount: number;
  expenses: ExpenseType[]; // Array of original expenses within this group
};

type SearchExpensesResponseType = {
  expenses: ExpenseType[] | ExpenseGroup[]; // Can be array of expenses or array of groups
  from?: Date | string | null; // Keep types flexible based on API/parsing
  to?: Date | string | null;
  search?: string | null;
  allTimeTotalValue: number;
  filteredTotalValue: number; // Might represent total of filtered groups or expenses
  weekTotal: number;
  monthTotal: number;
  mostSpentInADay: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  totalExpenses: number; // Might represent total groups or total individual expenses when filtered
};

export const useSearchExpensesQuery = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();

  // Read parameters from URL search params
  const pageSizeParam = searchParams.get("PageSize") || "30";
  const pageNumberParam = searchParams.get("PageNumber") || "1";
  const from = searchParams.get("from"); // null if not present
  const to = searchParams.get("to"); // null if not present
  const search = searchParams.get("q"); // null if not present, use "" for default if needed
  const category = searchParams.get("category"); // null if not present
  const amount = searchParams.get("amount"); // null if not present
  const groupby = searchParams.get("groupby"); // Added: null if not present

  // Memoize parsed values if needed, or handle directly in queryFn
  // const PageSize = parseInt(pageSizeParam, 10);
  // const PageNumber = parseInt(pageNumberParam, 10);

  return useQuery({
    // Query key includes all parameters that influence the fetch
    queryKey: [
      "expenses",
      {
        pageSize: pageSizeParam,
        pageNumber: pageNumberParam,
        from,
        to,
        search,
        amount,
        category,
        groupby, // Added groupby to queryKey
      },
    ],
    queryFn: async () => {
      // Construct parameters object with the correct type
      // Only include parameters that have a value
      const params: ExpenseApiParams = {
        pageSize: +pageSizeParam, // Convert to number
        pageNumber: +pageNumberParam, // Convert to number
      };

      if (from) params.from = from;
      if (to) params.to = to;
      // Send search even if empty string, or check if (search) if backend treats null/empty differently
      if (search !== null) params.search = search;
      if (amount) params.amount = amount; // Send amount if present
      if (category) params.category = category; // Send category if present
      if (groupby) params.groupby = groupby; // Send groupby if present

      // Make the API request
      const { data: response } = await axios.get(`expense`, {
        params: params, // Pass typed params object
      });

      // Assuming the actual data payload is nested under a 'data' key in the response
      // Adjust this if your API response structure is different
      const { data } = response;

      // Assert the type of the received data payload
      // Add runtime validation here if needed (e.g., with Zod) for more safety
      return data as SearchExpensesResponseType;
    },
    // Optional: Keep previous data while fetching new data for smoother UX
    // keepPreviousData: true,
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
      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });
};

// using the following route: /Report/GetTotalCostsByTypeAndDateRange
