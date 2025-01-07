import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function OverView({ analytics }: { analytics: any }) {
  return (
    <div className="bg-card rounded-sm p-4 border grid gap-2 lg:w-[70%]">
      <span className="text-5xl max-lg:text-3xl tracking-wide">Overview</span>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 items-center flex-1 ">
        <CardDetails
          title="Wallet Balance"
          description="Your current balance in your wallet"
          amount={analytics?.walletBalance}
          Icon={<CreditCard />}
          main
        />

        <CardDetails
          title="Expenses"
          description="How much you spent"
          amount={analytics?.allTimeTotalExpensesValue}
          Icon={<TrendingDown />}
          cta="expenses"
        />
        <CardDetails
          title="Earned"
          description="How much you earned from your payments"
          amount={analytics?.totalPaymentsValue}
          Icon={<TrendingUp />}
        />
        <CardDetails
          title="Saving Plan"
          description="Your saving plan"
          amount={analytics?.walletBalance}
          Icon={<CreditCard />}
          className="select-none  relative"
        >
          {/* <div className="absolute top-0 left-0 w-full h-full z-10 bg-neutral-300/30 " /> */}
          <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-sm">
            <p className="text-2xl font-semibold text-secondary-foreground">
              Coming Soon
            </p>
          </div>
        </CardDetails>
      </div>
    </div>
  );
}

function CardDetails({
  title,
  description,
  amount,
  Icon,
  main,
  cta,
  className,
  children,
}: {
  title: string;
  description: string;
  amount: number;
  Icon?: JSX.Element;
  main?: boolean;
  cta?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card
      className={`${
        main ? "bg-primary" : " bg-secondary/40"
      } p-4 grid gap-4 border-${main ? "0" : "2"} ${className}`}
    >
      <CardHeader className="flex-row items-center gap-2 p-0">
        <span
          className={`p-2 ${
            main ? "bg-white text-muted" : "bg-secondary"
          } rounded-full`}
        >
          {Icon}
        </span>
        <div>
          <CardTitle
            className={`${main ? "text-white" : "text-secondary-foreground"}`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={`${
              main ? "text-neutral-300" : "text-secondary-foreground/50"
            }`}
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <Separator className="h-[1px]" />
      <CardContent className="flex items-center flex-row justify-between gap-2 p-0">
        <div
          className={`text-2xl font-semibold ${
            main ? "text-white" : "text-foreground"
          }`}
        >
          <span>₪</span>
          &nbsp;
          {amount}
        </div>
        {cta && (
          <Link
            to={`/${cta}`}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <ArrowRight />
          </Link>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
