"use client";

import { Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";

const chartConfig = {
  previous: {
    label: "Previous Week",
    color: "hsl(var(--chart-1))",
  },
  current: {
    label: "Current Week",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ExpenseOverviewChart({
  expensesData,
}: {
  expensesData: {
    date: string;
    week: string;
    totalAmount: number;
  }[];
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "eee");
  };

  const processedData = expensesData.reduce((acc, item) => {
    const formattedDate = formatDate(item.date);
    if (!acc[formattedDate]) {
      acc[formattedDate] = { date: formattedDate };
    }
    acc[formattedDate][item.week as "previous" | "current"] = item.totalAmount;
    return acc;
  }, {} as Record<string, { date: string; previous?: number; current?: number }>);

  const chartData = Object.values(processedData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card className="bg-transparent h-fit p-0 w-full shadow-none">
      <CardHeader className="p-0">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="h-fit">
        <ChartContainer
          config={chartConfig}
          className="max-h-24 h-fit w-full p-0"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={20}
            />
            <Line
              dataKey="previous"
              type="monotone"
              stroke="hsl(var(--chart-7))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              dataKey="current"
              type="monotone"
              stroke="hsl(var(--chart-8))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
