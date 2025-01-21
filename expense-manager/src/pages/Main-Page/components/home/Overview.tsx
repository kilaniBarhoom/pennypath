import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Plus,
  CreditCard,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddEditExpenseSheet from "../expenses/add-edit-sheet";
import { useTranslation } from "react-i18next";
import TooltipComponent from "@/components/shared/tooltip-component";
import { ny } from "@/lib/utils";
import { ExpenseOverviewChart } from "./ExpenseOverviewChart";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function OverView({ analytics }: { analytics: any }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full"
      variants={containerVariants}
    >
      <Card aria-describedby="overview" className="w-full h-full">
        <CardContent className="flex items-center max-md:flex-col h-full w-full gap-2 p-0">
          <div className="grid gap-2 flex-1 w-full">
            <CardDetails
              title="Wallet Balance"
              description="Your current balance in your wallet"
              amount={analytics?.walletBalance}
              Icon={
                <motion.span
                  className={`p-2 bg-secondary rounded-full`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <CreditCard />
                </motion.span>
              }
              main
            />

            <CardDetails
              title="Earned"
              description="How much you earned"
              className="h-full"
              amount={analytics?.totalPaymentsValue}
              Icon={
                <motion.span
                  className={`p-2 bg-green-500 rounded-full`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="text-black" />
                </motion.span>
              }
              cta="payments"
            />
          </div>
          <div className="flex-1 h-full w-full">
            <CardDetails
              title="Expenses"
              description="How much you spent"
              className="h-full"
              amount={analytics?.allTimeTotalExpensesValue}
              Icon={
                <motion.span
                  className={`p-2 bg-red-500 rounded-full`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingDown className="text-white" />
                </motion.span>
              }
              cta="expenses"
              chart={
                <ExpenseOverviewChart
                  expensesData={
                    analytics?.expensesOfCurrentAndPreviousWeeks as {
                      date: string;
                      week: string;
                      totalAmount: number;
                    }[]
                  }
                />
              }
              action={
                <AddEditExpenseSheet>
                  <Button className="w-fit p-2" size="sm">
                    {t("Add")}
                    <Plus className="inline h-3 w-3 ml-1" />
                  </Button>
                </AddEditExpenseSheet>
              }
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CardDetails({
  title,
  description,
  amount,
  Icon,
  main,
  cta,
  action,
  chart,
  className,
  children,
}: {
  title: string;
  description: string;
  amount: number;
  Icon?: JSX.Element;
  main?: boolean;
  cta?: string;
  action?: JSX.Element;
  chart?: JSX.Element;
  className?: string;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <motion.div variants={cardVariants}>
      <Card
        className={`${
          main
            ? "bg-gradient-to-r from-primary dark:from-primary/30 to-primary/80 dark:to-primary/60 h-full w-full"
            : "bg-secondary/50"
        } p-4 grid gap-4 items-start ${className}`}
      >
        <div className="flex items-center justify-between gap-2">
          <CardHeader className="flex-row items-center gap-2 p-0">
            {Icon}
            <div>
              <CardTitle
                className={`${
                  main ? "text-white" : "text-secondary-foreground"
                }`}
              >
                {t(title)}
              </CardTitle>
              <CardDescription
                className={`${
                  main ? "text-neutral-300" : "text-secondary-foreground/50"
                }`}
              >
                {t(description)}
              </CardDescription>
            </div>
          </CardHeader>
          {action}
        </div>
        <CardContent className="flex flex-col gap-2 p-0">
          {chart}
          <div className="flex items-center flex-row justify-between gap-2">
            <motion.div
              className={`font-semibold text-3xl ${
                main ? "text-white" : "text-foreground"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>₪</span>
              &nbsp;
              {amount}
            </motion.div>
            {cta && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <TooltipComponent content="View">
                  <Link
                    to={`/${cta}`}
                    className={ny(
                      "rtl:rotate-180",
                      buttonVariants({
                        variant: "outline",
                        size: "icon",
                      })
                    )}
                  >
                    <ArrowRight />
                  </Link>
                </TooltipComponent>
              </motion.div>
            )}
          </div>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
