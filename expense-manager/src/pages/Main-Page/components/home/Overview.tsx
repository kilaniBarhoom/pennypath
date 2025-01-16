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
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full"
      variants={containerVariants}
    >
      <Card className="">
        <CardHeader className="text-5xl max-lg:text-3xl tracking-wide">
          Overview
        </CardHeader>
        <CardDescription></CardDescription>
        <CardContent className="grid lg:grid-cols-3 w-full gap-2">
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
    <motion.div variants={cardVariants}>
      <Card
        className={`${
          main
            ? "bg-gradient-to-r from-primary dark:from-primary/30 to-primary/80 dark:to-primary/60 w-full"
            : "bg-secondary/50"
        } p-4 grid gap-4 w-full h-40 ${className}`}
      >
        <CardHeader className="flex-row items-center gap-2 p-0">
          {Icon}
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
              <Link
                to={`/${cta}`}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <ArrowRight />
              </Link>
            </motion.div>
          )}
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
