"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const initialChartData = [
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
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AnalyticsChart1({ data }: { data: Record<string, number> }) {
  const [chartData, setChartData] = useState(initialChartData);
  const [visibleMonths, setVisibleMonths] = useState(12);

  useEffect(() => {
    const updatedChartData = initialChartData.map((item) => ({
      ...item,
      amount: data[item.month] || 0,
    }));
    setChartData(updatedChartData);
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleMonths(12);
      } else if (window.innerWidth >= 768) {
        setVisibleMonths(6);
      } else {
        setVisibleMonths(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleData = chartData.slice(0, visibleMonths);

  const totalAmount = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total Spent By Month</CardTitle>
        <CardDescription>
          January - December {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer className="h-[300px] w-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={visibleData}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="amount"
                  position="top"
                  formatter={(value: number) => `₪${value.toFixed(2)}`}
                  className="fill-foreground text-xs"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          {percentageChange > 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(percentageChange).toFixed(1)}% this month
          <TrendingUp
            className={`h-4 w-4 ${
              percentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Total spent: ₪{totalAmount.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
