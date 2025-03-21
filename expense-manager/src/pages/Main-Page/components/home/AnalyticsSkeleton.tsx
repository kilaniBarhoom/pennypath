"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto grid gap-6">
        {/* Overview Section */}
        <div className="grid gap-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
            {/* Main Balance Card */}
            <Card className="bg-gradient-to-r from-primary dark:from-primary/30 to-primary/80 dark:to-primary/60 w-full border-0">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-0">
                <Skeleton className="h-10 w-10 rounded-full bg-primary-foreground/20" />
                <div className="space-y-1">
                  <CardTitle>
                    <Skeleton className="h-5 w-32 bg-primary-foreground/20" />
                  </CardTitle>
                  <Skeleton className="h-4 w-40 bg-primary-foreground/20" />
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <Skeleton className="h-8 w-28 bg-primary-foreground/20" />
              </CardContent>
            </Card>
            {/* Other Overview Cards */}
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="bg-secondary/40 p-6 border-0">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-0">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <CardTitle>
                      <Skeleton className="h-5 w-32" />
                    </CardTitle>
                    <Skeleton className="h-4 w-40" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-6">
                  <Skeleton className="h-8 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex max-lg:flex-col gap-2 items-center w-full">
            {/* Recent Transactions */}
            <Card className="p-6 flex-[2] w-full h-full bg-secondary/40 border-0">
              <CardHeader className="flex flex-row items-center justify-between px-0">
                <CardTitle>
                  <Skeleton className="h-6 w-40" />
                </CardTitle>
                <Skeleton className="h-8 w-20" />
              </CardHeader>
              <CardContent className="px-0 h-full">
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Category Expenses Card */}
            <Card className="p-6 flex-1 w-full bg-secondary/40 border-0">
              <CardHeader className="space-y-2 px-0">
                <CardTitle>
                  <Skeleton className="h-6 w-40" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-56" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 px-0">
                <div className="aspect-square w-full max-w-[250px]">
                  <Skeleton className="h-full w-full rounded-full" />
                </div>
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="rounded-md bg-secondary p-2">
                      <Skeleton className="h-2 w-10" />
                      <Skeleton className="mt-1 h-4 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Monthly Spending Chart */}
          <Card className="p-6 bg-secondary/40 border-0">
            <CardHeader className="space-y-2 px-0">
              <div className="flex items-center justify-between">
                <CardTitle>
                  <Skeleton className="h-6 w-48" />
                </CardTitle>
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="h-[200px] w-full">
                <div className="flex h-full items-end gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-full">
                      <Skeleton
                        className={`w-full h-[${
                          Math.random() * 100
                        }%] min-h-[20%]`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
