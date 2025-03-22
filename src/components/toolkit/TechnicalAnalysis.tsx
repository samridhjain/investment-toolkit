
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartLine, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

type PriceData = {
  date: string;
  price: number;
  ma50: number;
  ma200: number;
};

type IndicatorProps = {
  name: string;
  value: string | number;
  status: 'bullish' | 'bearish' | 'neutral';
};

const Indicator = ({ name, value, status }: IndicatorProps) => {
  return (
    <div className="flex flex-col p-3 rounded-md bg-secondary/50">
      <span className="text-xs text-muted-foreground">{name}</span>
      <div className="flex items-baseline mt-0.5">
        <span className="font-medium">{value}</span>
        <span className={`ml-2 text-xs ${
          status === 'bullish' ? 'text-market-positive' : 
          status === 'bearish' ? 'text-market-negative' : 
          'text-market-neutral'
        }`}>
          {status === 'bullish' ? 'Bullish' : 
           status === 'bearish' ? 'Bearish' : 
           'Neutral'}
        </span>
      </div>
    </div>
  );
};

const TechnicalAnalysis = () => {
  const isMobile = useIsMobile();
  
  // Mock data - would be fetched from API in a real app
  const priceData: PriceData[] = [
    { date: 'Jan 1', price: 150, ma50: 148, ma200: 145 },
    { date: 'Jan 2', price: 153, ma50: 149, ma200: 145 },
    { date: 'Jan 3', price: 155, ma50: 150, ma200: 146 },
    { date: 'Jan 4', price: 151, ma50: 150, ma200: 146 },
    { date: 'Jan 5', price: 154, ma50: 151, ma200: 146 },
    { date: 'Jan 6', price: 158, ma50: 152, ma200: 147 },
    { date: 'Jan 7', price: 160, ma50: 153, ma200: 147 },
    { date: 'Jan 8', price: 157, ma50: 153, ma200: 147 },
    { date: 'Jan 9', price: 162, ma50: 154, ma200: 148 },
    { date: 'Jan 10', price: 165, ma50: 155, ma200: 148 },
    { date: 'Jan 11', price: 167, ma50: 156, ma200: 149 },
    { date: 'Jan 12', price: 170, ma50: 157, ma200: 149 },
    { date: 'Jan 13', price: 173, ma50: 158, ma200: 150 },
    { date: 'Jan 14', price: 175, ma50: 159, ma200: 150 }
  ];
  
  const indicators = [
    { name: 'RSI (14)', value: 68, status: 'neutral' as const },
    { name: 'MACD', value: 'Positive', status: 'bullish' as const },
    { name: 'Stochastic', value: '82/90', status: 'bearish' as const },
    { name: 'Bollinger Bands', value: 'Upper', status: 'bearish' as const },
    { name: 'Moving Averages', value: 'Above', status: 'bullish' as const },
    { name: 'Volume', value: '+15%', status: 'bullish' as const },
  ];
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChartLine className="h-4 w-4 text-market-blue" />
            <CardTitle className="text-base">Technical Analysis</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <Eye className="h-3.5 w-3.5" />
            Full Analysis
          </Button>
        </div>
        <CardDescription>AAPL - Apple Inc.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="price">Price Chart</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickCount={isMobile ? 5 : 10}
                />
                <YAxis
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone"
                  dataKey="price"
                  stroke="#007AFF"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ma50"
                  stroke="#5856D6"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="3 3"
                />
                <Line 
                  type="monotone" 
                  dataKey="ma200"
                  stroke="#8E8E93"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="2 2"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="indicators">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {indicators.map((indicator) => (
                <Indicator key={indicator.name} {...indicator} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TechnicalAnalysis;
