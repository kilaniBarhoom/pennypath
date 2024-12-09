"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", amount: 0 },
  { month: "February", amount: 0 },
  { month: "March", amount: 0 },
  { month: "April", amount: 0 },
  { month: "May", amount: 0 },
  { month: "June", amount: 0 },
  { month: "July", amount: 0 },
  { month: "August", amount: 0 },
  { month: "September", amount: 0 },
  { month: "October", amount: 0 },
  { month: "November", amount: 0 },
  { month: "December", amount: 0 },
];

const chartConfig = {
  amount: {
    label: "amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AnalyticsChart1({ data }: { data: any }) {
  let key: any;
  for (key in data) {
    chartData.find((item) => {
      if (item.month === key) {
        item.amount = data[key];
      }
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total Spent By month</CardTitle>
        <CardDescription>
          January - December&nbsp;
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer className="max-h-40 w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
