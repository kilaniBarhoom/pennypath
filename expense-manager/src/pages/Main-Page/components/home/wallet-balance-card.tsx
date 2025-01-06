import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WalletBalanceCard({ analytics }: { analytics: any }) {
  return (
    <Card className="w-full flex-1">
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
        <CardDescription>
          Your current balance and recent transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-semibold text-green-500">
          <span>₪</span>
          {analytics?.walletBalance}
        </div>
      </CardContent>
    </Card>
  );
}
