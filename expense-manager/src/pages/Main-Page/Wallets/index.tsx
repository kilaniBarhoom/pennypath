import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DownloadIcon,
  FilterIcon,
  MoreVertical,
  PiggyBankIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { Helmet } from "react-helmet";

const Wallets = () => {
  // const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Wallets</title>
      </Helmet>
      <div className="flex md:items-center max-md:flex-col gap-2 justify-between my-4">
        <BreadcrumbComponent tree={[{ title: "Wallets" }]} currentPage="All" />
        <div className="flex gap-2">
          <Button variant="default">
            <span className="mr-2">Add Wallet</span>
            {"+"}
          </Button>
          <Button variant="outline">
            <span className="mr-2">Export</span>
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h1 className="text-6xl w-fit mx-auto my-5">Wire Frame</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <WalletIcon className="h-4 w-4" />
              <h2 className="font-medium">Main Wallet</h2>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,458.90</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>Last updated: Today</span>
              <span className="ml-2 text-red-500">-2.4%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <PiggyBankIcon className="h-4 w-4" />
              <h2 className="font-medium">Savings</h2>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,129.00</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>Last updated: Yesterday</span>
              <span className="ml-2 text-green-500">+5.7%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              <h2 className="font-medium">Investments</h2>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78,562.30</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>Last updated: 2 days ago</span>
              <span className="ml-2 text-red-500">-1.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Card>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowDownIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Income Payment</div>
                  <div className="text-sm text-muted-foreground">
                    Feb 15, 2025
                  </div>
                </div>
              </div>
              <div className="text-green-600">+$2,500.00</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowUpIcon className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium">Rent Payment</div>
                  <div className="text-sm text-muted-foreground">
                    Feb 12, 2025
                  </div>
                </div>
              </div>
              <div className="text-red-600">-$1,200.00</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowUpIcon className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium">Grocery Shopping</div>
                  <div className="text-sm text-muted-foreground">
                    Feb 10, 2025
                  </div>
                </div>
              </div>
              <div className="text-red-600">-$89.50</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
