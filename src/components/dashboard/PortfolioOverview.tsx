
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type StockProps = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  shares: number;
  allocation: number;
  hasAnomaly?: boolean;
};

const StockRow = ({ symbol, name, price, change, changePercent, shares, allocation, hasAnomaly }: StockProps) => {
  const isPositive = change >= 0;
  const value = price * shares;
  
  return (
    <div className="group flex flex-col space-y-1 p-2 rounded-md transition-all duration-300 hover:bg-secondary/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">{symbol}</span>
          {hasAnomaly && (
            <AlertCircle className="h-3.5 w-3.5 ml-1.5 text-market-negative" />
          )}
        </div>
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
      
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">{name}</span>
        <span className="text-sm font-medium">${value.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Progress value={allocation} className="h-1.5" />
        <span className="text-xs text-muted-foreground">{allocation}%</span>
      </div>
    </div>
  );
};

const PortfolioOverview = () => {
  // Mock data - would be fetched from API in a real app
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 192.53, change: 2.31, changePercent: 1.21, shares: 25, allocation: 25, hasAnomaly: true },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 403.78, change: 5.62, changePercent: 1.41, shares: 12, allocation: 20 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 171.83, change: -3.25, changePercent: -1.86, shares: 18, allocation: 15 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 193.57, change: -7.14, changePercent: -3.56, shares: 20, allocation: 18, hasAnomaly: true },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 721.33, change: 15.76, changePercent: 2.23, shares: 8, allocation: 22 },
  ];
  
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.price * stock.shares), 0);
  const totalChange = stocks.reduce((sum, stock) => sum + (stock.change * stock.shares), 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;
  const isPositive = totalChange >= 0;
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in animate-delay-100">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-market-indigo" />
          <CardTitle className="text-base">Portfolio Overview</CardTitle>
        </div>
        <CardDescription>Your investment portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">${totalValue.toLocaleString()}</span>
            <div 
              className={cn(
                "ml-2 flex items-center",
                isPositive ? "text-market-positive" : "text-market-negative"
              )}
            >
              {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span>{isPositive ? "+" : ""}{totalChange.toFixed(2)} ({totalChangePercent.toFixed(2)}%)</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Total portfolio value</p>
        </div>
        
        <div className="space-y-0.5">
          {stocks.map((stock) => (
            <StockRow key={stock.symbol} {...stock} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;
