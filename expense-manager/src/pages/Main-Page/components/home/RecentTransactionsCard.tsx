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
      <CardContent>
        <div className="space-y-2">
          {analytics &&
            analytics.recentExpensesTransactions?.categories
              ?.slice(0, 5)
              .map(
                (
                  category: { name: string; amount: number; createdAt?: Date },
                  ind: number
                ) => {
                  return (
                    <div
                      key={ind}
                      className="flex items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded-sm bg-secondary p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${category.name}`}
                            alt={category.name}
                          />
                          <AvatarFallback>
                            {category.name?.charAt(0) ?? ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-ellipsis whitespace-nowrap overflow-hidden max-w-20">
                            {category.name}
                          </div>
                          {category?.createdAt && (
                            <div className="text-sm text-muted-foreground">
                              {format(category.createdAt, "eee, dd/MM HH:mm")}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>₪&nbsp;{category.amount?.toFixed(2) ?? 0}</div>
                    </div>
                  );
                }
              )}
        </div>
      </CardContent>
    </Card>
  );
}
