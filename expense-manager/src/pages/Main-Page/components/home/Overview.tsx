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
      <Card aria-describedby="overview" className="w-full">
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-2 p-0">
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
            title="Expenses"
            description="How much you spent"
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
            action={
              <AddEditExpenseSheet>
                <Button className="w-fit p-2" size="sm">
                  {t("Add")}
                  <Plus className="inline h-3 w-3 ml-1" />
                </Button>
              </AddEditExpenseSheet>
            }
          />
          <CardDetails
            title="Earned"
            description="How much you earned"
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
  className?: string;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <motion.div variants={cardVariants}>
      <Card
        className={`${
          main
            ? "bg-gradient-to-r from-primary dark:from-primary/30 to-primary/80 dark:to-primary/60 w-full"
            : "bg-secondary/50"
        } p-4 grid gap-4 w-full h-40 ${className}`}
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
        <CardContent className="flex items-center flex-row justify-between gap-2 p-0">
          <motion.div
            className={`font-semibold ${
              main ? "text-white text-3xl" : "text-foreground text-2xl"
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
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
