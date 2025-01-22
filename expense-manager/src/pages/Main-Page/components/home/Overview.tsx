// Import Statements
import TooltipComponent from "@/components/shared/tooltip-component";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ny } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AddEditExpenseSheet from "../expenses/add-edit-sheet-drawer/index.tsx";
import { ExpenseOverviewChart } from "./ExpenseOverviewChart";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
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
      <Card aria-describedby="overview" className="w-full h-auto p-0">
        <CardContent className="flex flex-col gap-2 p-4">
          {/* Wallet Balance and Earned */}
          <div className="flex gap-2">
            <CardDetails
              title="Wallet Balance"
              description="Your current balance in your wallet"
              amount={analytics?.walletBalance}
              Icon={
                <motion.span
                  className="p-2 bg-secondary rounded-full text-secondary-foreground"
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
              amount={analytics?.totalPaymentsValue}
              Icon={
                <motion.span
                  className="p-2 bg-green-500 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="text-black" />
                </motion.span>
              }
              cta="payments"
            />
          </div>

          {/* Expenses */}
          <CardDetails
            title="Expenses"
            description="How much you spent"
            amount={analytics?.allTimeTotalExpensesValue}
            Icon={
              <motion.span
                className="p-2 bg-red-500 rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <TrendingDown className="text-white" />
              </motion.span>
            }
            cta="expenses"
            chart={
              <ExpenseOverviewChart
                expensesData={analytics?.expensesOfCurrentAndPreviousWeeks}
              />
            }
            action={
              <AddEditExpenseSheet>
                <Button size="sm" className="flex items-center gap-1">
                  {t("Add")}
                  <Plus className="h-4 w-4" />
                </Button>
              </AddEditExpenseSheet>
            }
          />
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
  className = "",
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
    <motion.div
      variants={cardVariants}
      className={`flex-1 h-full ${className}`}
    >
      <Card
        className={`p-4 grid gap-4 ${
          main
            ? "bg-gradient-to-r from-primary/80 to-primary/60 text-white"
            : "bg-secondary/50 text-secondary-foreground border"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <CardHeader className="flex items-start flex-row gap-2">
            {Icon}
            <div>
              <CardTitle>{t(title)}</CardTitle>
              <CardDescription className={`${main && "text-neutral-200"}`}>
                {t(description)}
              </CardDescription>
            </div>
          </CardHeader>
          {action}
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-4">
          {chart}
          <div className="flex justify-between items-center">
            <motion.div
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              ₪ {amount}
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
                      buttonVariants({ variant: "outline", size: "icon" })
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
