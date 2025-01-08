import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function OverView({ analytics }: { analytics: any }) {
  return (
    <Card className="lg:w-[70%]">
      <CardHeader className="text-5xl max-lg:text-3xl tracking-wide">
        Overview
      </CardHeader>
      <CardDescription></CardDescription>
      <CardContent className="grid grid-cols-2 w-full gap-2">
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
          description="How much you earned"
          amount={analytics?.totalPaymentsValue}
          Icon={<TrendingUp />}
        />
        {/* <CardDetails
          title="Saving Plan"
          description="Your saving plan"
          amount={analytics?.walletBalance}
          Icon={<CreditCard />}
          className="select-none  relative"
        >
          <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-sm">
            <p className="text-2xl font-semibold text-secondary-foreground">
              Coming Soon
            </p>
          </div>
        </CardDetails> */}
      </CardContent>
    </Card>
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
        main ? "bg-primary w-full col-span-2" : "bg-secondary/40"
      } p-4 grid gap-4 w-full h-40 ${className}`}
      style={main ? { background: "" } : {}}
    >
      <CardHeader className="flex-row items-center gap-2 p-0">
        <span className={`p-2 bg-secondary rounded-full`}>{Icon}</span>
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
      <CardContent className="flex items-center flex-row justify-between gap-2 p-0">
        <div
          className={`font-semibold ${
            main ? "text-white text-3xl" : "text-foreground text-2xl"
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
