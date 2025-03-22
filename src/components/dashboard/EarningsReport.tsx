
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type EarningsItemProps = {
  symbol: string;
  name: string;
  date: string;
  time: 'Before Market' | 'After Market';
  eps?: { actual: number; expected: number };
  revenue?: { actual: number; expected: number };
  reported: boolean;
};

const EarningsItem = ({ symbol, name, date, time, eps, revenue, reported }: EarningsItemProps) => {
  const epsChange = eps ? eps.actual - eps.expected : 0;
  const revenueChange = revenue ? revenue.actual - revenue.expected : 0;
  
  return (
    <div className="group flex flex-col space-y-1 p-3 rounded-md transition-all duration-300 hover:bg-secondary/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">{symbol}</span>
          <span className={cn(
            "ml-2 text-xs px-2 py-0.5 rounded-full",
            reported ? "bg-market-positive/10 text-market-positive" : "bg-market-blue/10 text-market-blue"
          )}>
            {reported ? 'Reported' : 'Upcoming'}
          </span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3 mr-1" />
          {date}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between">
        <span className="text-xs text-muted-foreground">{name}</span>
        <span className="text-xs">{time}</span>
      </div>
      
      {reported && eps && revenue && (
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">EPS</span>
            <div className="flex items-center">
              <span className="font-medium">${eps.actual.toFixed(2)}</span>
              <span className={cn(
                "ml-1.5 text-xs flex items-center",
                epsChange >= 0 ? "text-market-positive" : "text-market-negative"
              )}>
                {epsChange >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                {(epsChange >= 0 ? "+" : "")}{epsChange.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Revenue</span>
            <div className="flex items-center">
              <span className="font-medium">${(revenue.actual / 1e9).toFixed(1)}B</span>
              <span className={cn(
                "ml-1.5 text-xs flex items-center",
                revenueChange >= 0 ? "text-market-positive" : "text-market-negative"
              )}>
                {revenueChange >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                {(revenueChange >= 0 ? "+" : "")}${Math.abs(revenueChange / 1e9).toFixed(1)}B
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EarningsReport = () => {
  // Mock data - would be fetched from API in a real app
  const reportedEarnings = [
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      date: "Feb 1, 2024", 
      time: "After Market" as const, 
      eps: { actual: 2.18, expected: 2.10 },
      revenue: { actual: 119.6e9, expected: 117.8e9 },
      reported: true
    },
    { 
      symbol: "MSFT", 
      name: "Microsoft Corp.", 
      date: "Jan 30, 2024", 
      time: "After Market" as const, 
      eps: { actual: 2.93, expected: 2.77 },
      revenue: { actual: 62.0e9, expected: 61.1e9 },
      reported: true
    },
  ];
  
  const upcomingEarnings = [
    { 
      symbol: "AMZN", 
      name: "Amazon.com Inc.", 
      date: "Feb 12, 2024", 
      time: "After Market" as const,
      reported: false
    },
    { 
      symbol: "TSLA", 
      name: "Tesla Inc.", 
      date: "Feb 15, 2024", 
      time: "After Market" as const,
      reported: false
    },
    { 
      symbol: "NVDA", 
      name: "NVIDIA Corp.", 
      date: "Feb 21, 2024", 
      time: "After Market" as const,
      reported: false
    },
  ];
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in animate-delay-300">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-market-neutral" />
          <CardTitle className="text-base">Earnings Reports</CardTitle>
        </div>
        <CardDescription>Recent and upcoming earnings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reported" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="reported">Reported</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="reported" className="space-y-0.5">
            {reportedEarnings.map((item) => (
              <EarningsItem key={item.symbol} {...item} />
            ))}
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-0.5">
            {upcomingEarnings.map((item) => (
              <EarningsItem key={item.symbol} {...item} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EarningsReport;
