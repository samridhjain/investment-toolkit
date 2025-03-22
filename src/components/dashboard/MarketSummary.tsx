
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

type MarketIndexProps = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
};

const MarketIndex = ({ name, value, change, changePercent }: MarketIndexProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <div 
          className={cn(
            "flex items-center text-xs px-2 py-0.5 rounded-full",
            isPositive ? "text-market-positive bg-market-positive/10" : "text-market-negative bg-market-negative/10"
          )}
        >
          {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {changePercent.toFixed(2)}%
        </div>
      </div>
      <div className="flex items-baseline mt-1">
        <span className="text-lg font-semibold">{value.toLocaleString()}</span>
        <span 
          className={cn(
            "ml-2 text-xs",
            isPositive ? "text-market-positive" : "text-market-negative"
          )}
        >
          {isPositive ? "+" : ""}{change.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

const MarketSummary = () => {
  // Mock data - would be fetched from API in a real app
  const marketIndices = [
    { name: "S&P 500", value: 4892.37, change: 12.46, changePercent: 0.25 },
    { name: "Nasdaq", value: 15473.89, change: -45.23, changePercent: -0.29 },
    { name: "Dow Jones", value: 38654.12, change: 65.34, changePercent: 0.17 },
    { name: "Russell 2000", value: 1973.41, change: -8.91, changePercent: -0.45 },
  ];

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-market-blue" />
          <CardTitle className="text-base">Market Summary</CardTitle>
        </div>
        <CardDescription>Today's market overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketIndices.map((index) => (
            <MarketIndex key={index.name} {...index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSummary;
