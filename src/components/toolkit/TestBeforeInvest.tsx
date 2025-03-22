
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, ArrowRight, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type ScenarioData = {
  day: number;
  expected: number;
  optimistic: number;
  pessimistic: number;
};

const TestBeforeInvest = () => {
  const [amount, setAmount] = useState('10000');
  const [timeframe, setTimeframe] = useState('30');
  const [volatility, setVolatility] = useState(50);
  const [scenario, setScenario] = useState('neutral');
  const [showResults, setShowResults] = useState(false);
  
  // Mock data for simulation
  const generateSimulationData = (): ScenarioData[] => {
    const days = parseInt(timeframe);
    const investmentAmount = parseFloat(amount);
    const volatilityFactor = volatility / 100;
    const scenarioFactor = scenario === 'bullish' ? 1.5 : scenario === 'bearish' ? 0.7 : 1;
    
    const data: ScenarioData[] = [];
    
    for (let i = 0; i <= days; i++) {
      const dayFactor = i / days;
      const randomFactor = Math.sin(i * 0.1) * volatilityFactor * 0.2;
      
      const expected = investmentAmount * (1 + (dayFactor * 0.1 * scenarioFactor) + randomFactor);
      const optimistic = expected * (1 + volatilityFactor * 0.1);
      const pessimistic = expected * (1 - volatilityFactor * 0.1);
      
      data.push({
        day: i,
        expected: Math.round(expected),
        optimistic: Math.round(optimistic),
        pessimistic: Math.round(pessimistic)
      });
    }
    
    return data;
  };
  
  const simulationData = generateSimulationData();
  
  const handleRun = () => {
    setShowResults(true);
  };
  
  const handleReset = () => {
    setShowResults(false);
  };
  
  const expectedReturn = showResults ? 
    (simulationData[simulationData.length - 1].expected - parseInt(amount)) / parseInt(amount) * 100 : 
    0;
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in animate-delay-300">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TestTube className="h-4 w-4 text-market-indigo" />
          <CardTitle className="text-base">Test Before Invest</CardTitle>
        </div>
        <CardDescription>Simulate different investment scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!showResults ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="amount">Investment Amount ($)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80 text-xs">
                        <p>The amount you want to invest in this simulation.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1000"
                    max="1000000"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="timeframe">Timeframe (Days)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80 text-xs">
                        <p>The number of days for the investment simulation.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Input
                    id="timeframe"
                    type="number"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    min="7"
                    max="365"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Label>Volatility</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-80 text-xs">
                          <p>Higher volatility means more price fluctuations in the simulation.</p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <span className="text-sm">{volatility}%</span>
                  </div>
                  <Slider
                    value={[volatility]}
                    onValueChange={(value) => setVolatility(value[0])}
                    min={10}
                    max={90}
                    step={10}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label>Market Scenario</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80 text-xs">
                        <p>Choose the market scenario for this simulation.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <RadioGroup 
                    value={scenario} 
                    onValueChange={setScenario}
                    className="flex space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="bearish" id="bearish" />
                      <Label htmlFor="bearish">Bearish</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="neutral" id="neutral" />
                      <Label htmlFor="neutral">Neutral</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="bullish" id="bullish" />
                      <Label htmlFor="bullish">Bullish</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <Button 
                onClick={handleRun}
                className="w-full flex items-center justify-center gap-2"
              >
                Run Simulation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="rounded-md bg-secondary/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-medium">Simulation Results</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${amount} invested over {timeframe} days
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset
                  </Button>
                </div>
                
                <div className="h-[200px] mb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={simulationData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(day) => (day % 5 === 0 || day === 0 || day === parseInt(timeframe)) ? `D${day}` : ''}
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                        labelFormatter={(day) => `Day ${day}`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          fontSize: '12px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="pessimistic" 
                        stackId="1"
                        stroke="#FF3B30" 
                        fill="#FF3B30" 
                        fillOpacity={0.1}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expected" 
                        stackId="2"
                        stroke="#007AFF" 
                        fill="#007AFF" 
                        fillOpacity={0.2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="optimistic" 
                        stackId="3"
                        stroke="#34C759" 
                        fill="#34C759" 
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-background rounded-md p-2">
                    <p className="text-xs text-market-negative">Pessimistic</p>
                    <p className="font-medium">${simulationData[simulationData.length - 1].pessimistic.toLocaleString()}</p>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <p className="text-xs text-market-blue">Expected</p>
                    <p className="font-medium">${simulationData[simulationData.length - 1].expected.toLocaleString()}</p>
                    <p 
                      className={cn(
                        "text-xs",
                        expectedReturn >= 0 ? "text-market-positive" : "text-market-negative"
                      )}
                    >
                      {expectedReturn >= 0 ? "+" : ""}{expectedReturn.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <p className="text-xs text-market-positive">Optimistic</p>
                    <p className="font-medium">${simulationData[simulationData.length - 1].optimistic.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>This simulation uses historical volatility patterns and the selected market scenario to project possible outcomes. Actual results may vary significantly.</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestBeforeInvest;
