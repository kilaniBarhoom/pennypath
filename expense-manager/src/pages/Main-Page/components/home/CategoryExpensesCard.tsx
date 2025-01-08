"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ExternalLink } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import CategoriesDialog from "./CategoriesDialog";

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
    <Card className="lg:w-[30%]">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle className="text-lg">Category Expenses</CardTitle>
        <CategoriesDialog
          categories={Object.entries(categories).map(([name, amount]) => ({
            name,
            amount,
          }))}
        >
          <Button Icon={ExternalLink} iconPosition="right" size="sm">
            See all
          </Button>
        </CategoriesDialog>
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
        <div className="flex items-center gap-2">
          {Object.entries(categories)
            .slice(0, 3)
            .map(([name, amount]) => (
              <div
                key={name}
                className="grid items-center flex-1 bg-secondary py-2 px-4 rounded-md"
              >
                <div className="flex items-center">{name}</div>
                <div className="text-muted-foreground">
                  ₪&nbsp;{amount.toFixed(1)}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
