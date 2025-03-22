
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type RiskFactorProps = {
  name: string;
  value: number;
  impact: 'low' | 'medium' | 'high';
  info: string;
};

const RiskFactor = ({ name, value, impact, info }: RiskFactorProps) => {
  return (
    <div className="flex flex-col space-y-1 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium">{name}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-80 text-xs p-3">
              <p>{info}</p>
            </PopoverContent>
          </Popover>
        </div>
        <div 
          className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            impact === 'low' ? "bg-market-positive/10 text-market-positive" : 
            impact === 'medium' ? "bg-market-blue/10 text-market-blue" : 
            "bg-market-negative/10 text-market-negative"
          )}
        >
          {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Progress 
          value={value} 
          className={cn(
            "h-1.5",
            value <= 30 ? "text-market-positive" : 
            value <= 70 ? "text-market-blue" : 
            "text-market-negative"
          )}
        />
        <span className="text-xs text-muted-foreground">{value}%</span>
      </div>
    </div>
  );
};

const RiskAnalysis = () => {
  // Mock data - would be fetched from API in a real app
  const riskFactors = [
    { 
      name: "Volatility", 
      value: 75, 
      impact: 'high' as const,
      info: "Measures the price fluctuation of the stock compared to the market average. Higher volatility indicates greater price swings and potentially more risk."
    },
    { 
      name: "Beta", 
      value: 65, 
      impact: 'medium' as const,
      info: "Measures how a stock's price tends to move compared to the market as a whole. A beta above 1 indicates greater volatility than the market."
    },
    { 
      name: "Liquidity Risk", 
      value: 25, 
      impact: 'low' as const,
      info: "Assesses how easily shares can be bought or sold without affecting the stock price. Lower liquidity means potentially higher transaction costs."
    },
    { 
      name: "Valuation Risk", 
      value: 82, 
      impact: 'high' as const,
      info: "Indicates whether a stock may be overvalued based on its price relative to earnings, sales, and other financial metrics."
    },
    { 
      name: "Sector Risk", 
      value: 60, 
      impact: 'medium' as const,
      info: "Evaluates exposure to risks specific to the stock's industry sector, including regulatory changes and competitive pressures."
    },
  ];

  const overallRisk = 65;
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in animate-delay-100">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-market-indigo" />
          <CardTitle className="text-base">Risk Analysis</CardTitle>
        </div>
        <CardDescription>AAPL - Apple Inc.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Risk Level</span>
            <span 
              className={cn(
                "text-sm font-semibold",
                overallRisk <= 30 ? "text-market-positive" : 
                overallRisk <= 70 ? "text-market-blue" : 
                "text-market-negative"
              )}
            >
              {overallRisk <= 30 ? "Low" : 
               overallRisk <= 70 ? "Medium" : 
               "High"} Risk
            </span>
          </div>
          <Progress 
            value={overallRisk} 
            className={cn(
              "h-2.5",
              overallRisk <= 30 ? "text-market-positive" : 
              overallRisk <= 70 ? "text-market-blue" : 
              "text-market-negative"
            )}
          />
        </div>
        
        <div className="space-y-3">
          {riskFactors.map((factor) => (
            <RiskFactor key={factor.name} {...factor} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysis;
