import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ny } from "@/lib/utils";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentTransactionsCard({
  analytics,
}: {
  analytics: any;
}) {
  return (
    <Card className="min-h-60 flex flex-col">
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
      <CardContent className="space-y-2 flex flex-1 flex-col items-center justify-center h-full">
        {analytics && analytics.recentExpensesTransactions?.length > 0 ? (
          analytics.recentExpensesTransactions
            .slice(0, 5)
            .map(
              (
                expense: { name: string; amount: number; createdAt?: Date },
                ind: number
              ) => {
                return (
                  <div
                    key={ind}
                    className="flex items-center justify-between rounded-sm bg-secondary p-2"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${expense.name}`}
                          alt={expense.name}
                        />
                        <AvatarFallback>
                          {expense.name?.charAt(0) ?? ""}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-ellipsis whitespace-nowrap overflow-hidden max-w-20">
                          {expense.name}
                        </div>
                        {expense?.createdAt && (
                          <div className="text-sm text-muted-foreground">
                            {format(expense.createdAt, "eee, dd/MM HH:mm")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>₪&nbsp;{expense.amount?.toFixed(2) ?? 0}</div>
                  </div>
                );
              }
            )
        ) : (
          <span className="text-2xl lg:text-4xl text-muted-foreground text-center">
            No recent transactions
          </span>
        )}
      </CardContent>
    </Card>
  );
}
