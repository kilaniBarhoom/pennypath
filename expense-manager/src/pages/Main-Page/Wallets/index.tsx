"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet";

const Wallets = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100">
      <Helmet>
        <title>Wallets</title>
      </Helmet>
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-200 text-gray-500">
            Button 1
          </Button>
          <Button variant="outline" className="bg-gray-200 text-gray-500">
            Button 2
          </Button>
        </div>
      </div>

      <h1 className="text-4xl text-center text-gray-400 my-8">
        Wallet Wireframe
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <Card key={index} className="bg-gray-200 border-gray-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-400 rounded"></div>
                <div className="h-4 w-20 bg-gray-400 rounded"></div>
              </div>
              <div className="h-6 w-6 bg-gray-400 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-24 bg-gray-400 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-gray-300 my-4" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="bg-gray-200 border-gray-300">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-400 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="h-4 w-16 bg-gray-400 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallets;
