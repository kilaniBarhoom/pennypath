"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container grid gap-4 p-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2 h-[500px]">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <Skeleton className="h-4 w-32" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-7 w-24" />
                    <Skeleton className="mt-2 h-4 w-40" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Monthly Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <div className="flex h-full items-end gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-full" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Category Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <div className="aspect-square w-60 relative">
                <Skeleton className="h-full w-full rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
              <Skeleton className="h-4 w-16" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="mt-1 h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
