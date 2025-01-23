"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { ExternalLink } from "lucide-react";
import { Pie, PieChart } from "recharts";
import CategoriesDialog from "./CategoriesDialog";
import { useTranslation } from "react-i18next";

// Chart colors array for dynamic category assignment
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

export default function CategoryExpensesCard({
  analytics,
}: {
  analytics: {
    expensesGroupedByCategory: Array<{
      amount: number;
      category: {
        id: string;
        name: string;
      };
    }>;
  };
}) {
  // Transform categories data into chart format
  const categories = analytics.expensesGroupedByCategory;
  const { t } = useTranslation();

  let chartData: any = [];
  if (categories && categories.length > 0) {
    chartData = categories.map((item, index) => ({
      name: item.category.name,
      amount: item.amount,
      fill: chartColors[index % chartColors.length],
    }));
  }

  let chartConfig: ChartConfig = {
    amount: {
      label: "Amount",
    },
  };
  // Calculate total amount for footer
  if (categories && categories.length > 0) {
    chartConfig = {
      amount: {
        label: "Amount",
      },
      ...categories.reduce(
        (config, item, index) => ({
          ...config,
          [item.category.name?.toLowerCase()]: {
            label: item.category.name,
            color: chartColors[index % chartColors.length],
          },
        }),
        {}
      ),
    };
  }
  return (
    <Card className="flex h-full flex-col flex-1">
      <CardHeader className="flex items-center justify-between flex-row gap-4">
        <CardTitle className="text-lg">{t("Category Expenses")}</CardTitle>
        <CategoriesDialog
          categories={
            (categories &&
              categories.map((item) => ({
                name: item.category.name,
                amount: item.amount,
              }))) ??
            []
          }
        >
          <Button className="font-normal flex items-center" size="sm">
            {t("See all")}
            <ExternalLink className="inline h-3 w-3 ms-1 rtl:scale-x-[-1]" />
          </Button>
        </CategoriesDialog>
      </CardHeader>
      <CardContent className="h-fit pb-0">
        {categories && categories.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[300px] w-full"
          >
            <PieChart className="w-full max-h-[200px]">
              <ChartTooltip
                content={<ChartTooltipContent nameKey="name" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                label
                labelLine
                fontSize={20}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center h-full flex items-center justify-center">
            <span className="text-xl md:text-2xl text-secondary-foreground/60">
              {t("No expenses found")}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {categories && categories.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap w-full">
            {categories.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="h-4 rounded-sm aspect-square"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />
                <span className="text-sm">
                  {item.category.name}: {item.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
