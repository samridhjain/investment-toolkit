
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, CircleOff, TrendingUp, TrendingDown, Gauge, LineChart as LineChartIcon, FileText, Users, ChartLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type SentimentScoreProps = {
  name: string;
  score: number;
  icon: React.ReactNode;
};

const SentimentScore = ({ name, score, icon }: SentimentScoreProps) => {
  const getSentimentColor = (score: number) => {
    if (score <= 30) return 'text-market-negative';
    if (score <= 70) return 'text-market-neutral';
    return 'text-market-positive';
  };
  
  const getSentimentLabel = (score: number) => {
    if (score <= 30) return 'Bearish';
    if (score <= 70) return 'Neutral';
    return 'Bullish';
  };
  
  return (
    <div className="flex flex-col space-y-1 p-3 rounded-md bg-secondary/50">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{name}</span>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <Progress 
          value={score} 
          className={cn(
            "h-1.5",
            getSentimentColor(score)
          )}
        />
        <span 
          className={cn(
            "text-xs",
            getSentimentColor(score)
          )}
        >
          {score}% - {getSentimentLabel(score)}
        </span>
      </div>
    </div>
  );
};

type MacroIndicatorProps = {
  name: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  impact: 'positive' | 'negative' | 'neutral';
};

const MacroIndicator = ({ name, value, trend, impact }: MacroIndicatorProps) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-md transition-all duration-300 hover:bg-secondary/50">
      <span className="text-sm">{name}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{value}</span>
        <div className={cn(
          "flex items-center text-xs",
          trend === 'up' ? "text-market-positive" : 
          trend === 'down' ? "text-market-negative" : 
          "text-market-neutral"
        )}>
          {trend === 'up' ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : trend === 'down' ? (
            <TrendingDown className="h-3.5 w-3.5" />
          ) : (
            <CircleOff className="h-3.5 w-3.5" />
          )}
        </div>
        <div className={cn(
          "w-2 h-2 rounded-full",
          impact === 'positive' ? "bg-market-positive" : 
          impact === 'negative' ? "bg-market-negative" : 
          "bg-market-neutral"
        )} />
      </div>
    </div>
  );
};

const MarketConditions = () => {
  // Mock data - would be fetched from API in a real app
  const sentimentScores = [
    { 
      name: "Technical Sentiment", 
      score: 85,
      icon: <ChartLine className="h-4 w-4 text-market-blue" />
    },
    { 
      name: "News Sentiment", 
      score: 60,
      icon: <FileText className="h-4 w-4 text-market-indigo" />
    },
    { 
      name: "Analyst Sentiment", 
      score: 75,
      icon: <Users className="h-4 w-4 text-market-neutral" />
    },
  ];
  
  const macroIndicators = [
    { 
      name: "Interest Rates", 
      value: "5.25%", 
      trend: 'up' as const, 
      impact: 'negative' as const 
    },
    { 
      name: "Inflation (CPI)", 
      value: "3.2%", 
      trend: 'down' as const, 
      impact: 'positive' as const 
    },
    { 
      name: "GDP Growth", 
      value: "2.1%", 
      trend: 'up' as const, 
      impact: 'positive' as const 
    },
    { 
      name: "Unemployment", 
      value: "3.7%", 
      trend: 'neutral' as const, 
      impact: 'neutral' as const 
    },
  ];
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in animate-delay-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-market-blue" />
          <CardTitle className="text-base">Market Conditions</CardTitle>
        </div>
        <CardDescription>Overall market sentiment and macro indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Sentiment Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sentimentScores.map((score) => (
                <SentimentScore key={score.name} {...score} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              Macroeconomic Indicators
            </h3>
            <div className="space-y-0.5">
              {macroIndicators.map((indicator) => (
                <MacroIndicator key={indicator.name} {...indicator} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketConditions;
