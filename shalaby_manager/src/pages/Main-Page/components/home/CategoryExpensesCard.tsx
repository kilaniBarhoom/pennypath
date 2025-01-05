"use client";

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
import { Label, Pie, PieChart } from "recharts";

// Chart colors array for dynamic category assignment
const chartColors = [
  // random alot of colors
  "#36A2EB",
  "#FFCE56",
  "#E91E63",
  "#9966FF",
  "#607D8B",
  // greenish
  "#8BC34A",
  "#FF6384",
  "#FF9F40",
  "#4BC0C0",
  // purpleish
  "#9C27B0",
  "#4CAF50",
  // pinkish
  "#F44336",
  // greyish
  "#9E9E9E",
];

export default function CategoryExpensesCard({
  analytics,
}: {
  analytics: {
    expensesGroupedByCategory: Array<{
      categories: { [key: string]: number };
    }>;
  };
}) {
  // Transform categories data into chart format
  const categories = analytics.expensesGroupedByCategory[0].categories;
  const chartData = Object.entries(categories).map(([name, amount]) => ({
    name,
    amount,
    fill: `var(--color-${name.toLowerCase()})`,
  }));

  // Calculate total amount for center label
  const totalAmount = Object.values(categories).reduce(
    (sum, amount) => sum + amount,
    0
  );

  // Generate dynamic chart config based on categories
  const chartConfig: ChartConfig = {
    amount: {
      label: "Amount",
    },
    ...Object.keys(categories).reduce(
      (config, category, index) => ({
        ...config,
        [category.toLowerCase()]: {
          label: category,
          color: chartColors[index % chartColors.length],
        },
      }),
      {}
    ),
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category Expenses</CardTitle>
        <CardDescription>Your expenses grouped by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
