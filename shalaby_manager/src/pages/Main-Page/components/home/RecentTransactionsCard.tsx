import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ny } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentTransactionsCard({
  analytics,
}: {
  analytics: any;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Your recent transactions and their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {analytics &&
            analytics.last3DaysExpenses.map(
              (expense: ExpenseType & { diff: number }) => {
                return (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap"
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
                        <div className="text-sm text-muted-foreground">
                          {format(expense.createdAt, "dd MMM yyyy")}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-medium ${
                        expense.diff >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {expense.diff < 0 ? (
                        <ArrowUpRight className="inline h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="inline h-4 w-4" />
                      )}
                      ₪{expense.amount?.toFixed(2) ?? 0}
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          to="/expenses"
          className={ny(
            buttonVariants({ variant: "link" }),
            "w-fit ml-auto px-0"
          )}
        >
          View all transactions <ExternalLink className="inline h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
