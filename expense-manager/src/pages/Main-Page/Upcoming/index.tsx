import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ny } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Feature {
  id: string;
  title: string;
  description: string;
  progress: number;
  eta: string;
  category: string;
}

const features: Feature[] = [
  {
    id: "1",
    title: "Wallet Management",
    description: "Allow users to manage their wallets and track their expenses",
    progress: 5,
    eta: "1 week",
    category: "Front/Back",
  },
  {
    id: "2",
    title: "Logs",
    description: "Allow users to view their logs (epenses, incomes, etc.)",
    progress: 0,
    eta: "2 weeks",
    category: "Front/Back",
  },
  {
    id: "3",
    title: "Profile",
    description: "Allow users to view and edit their profiles",
    progress: 0,
    eta: "2.5 weeks",
    category: "Front/Back",
  },
  {
    id: "4",
    title: "Settings",
    description: "Allow users to view and edit their settings",
    progress: 0,
    eta: "3 weeks",
    category: "Front/Back",
  },
  {
    id: "5",
    title: "Reports",
    description:
      "Allow users to generate and export their reports as csv or pdf",
    progress: 0,
    eta: "4 weeks",
    category: "Front/Back",
  },
];

export default function UpcomingFeaturesPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-5">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
        <h1 className="text-3xl font-bold">{t("Upcoming Features")}</h1>
        <Link
          className={ny(buttonVariants(), "w-fit max-sm:w-full")}
          to="https://insigh.to/b/expense-tracker"
          target="_blank"
        >
          {t("Request a feature")}
        </Link>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {feature.title}
                <Badge variant="secondary">{feature.category}</Badge>
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">
                    {feature.progress}%
                  </span>
                </div>
                <Progress value={feature.progress} className="w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span>ETA: {feature.eta}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
