import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ny } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ExpenseCard } from "../expenses/list";

export default function RecentTransactionsCard({
  analytics,
}: {
  analytics: {
    recentExpensesTransactions: ExpenseType[];
  };
}) {
  const { t } = useTranslation();
  return (
    <Card className="min-h-60 flex-[2] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between flex-row">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Link
            to="/expenses"
            className={ny(
              buttonVariants({ size: "sm" }),
              "font-normal flex items-center"
            )}
          >
            See all
            <ExternalLink className="inline h-3 w-3 ml-1" />
          </Link>
        </div>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex flex-1 flex-col items-center justify-start h-full">
        {analytics && analytics.recentExpensesTransactions?.length > 0 ? (
          analytics.recentExpensesTransactions
            .slice(0, 5)
            .map((expense, ind: number) => {
              return <ExpenseCard key={ind} expense={expense} readonly />;
            })
        ) : (
          <div className="h-full flex items-center justify-center w-full">
            <span className="text-xl md:text-2xl text-secondary-foreground/60 text-center">
              {t("No recent expenses found")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
