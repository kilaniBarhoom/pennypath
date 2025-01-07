import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <Card className="lg:w-[30%]">
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
      <Separator />
      <CardContent>
        <div className="space-y-5">
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
                    <div>₪&nbsp;{expense.amount?.toFixed(2) ?? 0}</div>
                  </div>
                );
              }
            )}
        </div>
      </CardContent>
    </Card>
  );
}
