
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LineChart, Shield, Compass, Users, ChartLine } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TechnicalAnalysis from '@/components/toolkit/TechnicalAnalysis';
import RiskAnalysis from '@/components/toolkit/RiskAnalysis';
import MarketConditions from '@/components/toolkit/MarketConditions';
import AnalysisCard from '@/components/ui/AnalysisCard';
import StockSelector from '@/components/ui/StockSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DEFAULT_STOCK = { symbol: 'AAPL', name: 'Apple Inc.' };

const Toolkit = () => {
  const [selectedStocks, setSelectedStocks] = useState([DEFAULT_STOCK]);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const goToDashboard = () => {
    navigate('/');
  };
  
  const handleRunAnalysis = (analysisType: string) => {
    setActiveAnalysis(analysisType);
    setActiveTab('analysis');
  };
  
  const handleBackToOverview = () => {
    setActiveAnalysis(null);
    setActiveTab('overview');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8 animate-fade-in">
        <div className="flex items-center mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToDashboard} 
            className="gap-1 mr-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investment Toolkit</h1>
            <p className="text-muted-foreground mt-1">
              Deep-dive analysis tools for your portfolio
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Select Stock to Analyze</h2>
            <p className="text-sm text-muted-foreground">Choose a stock for detailed analysis</p>
          </div>
          <StockSelector selectedStocks={selectedStocks} onStocksChange={setSelectedStocks} />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="overview">Analysis Overview</TabsTrigger>
            <TabsTrigger value="analysis" disabled={!activeAnalysis}>Active Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalysisCard
                title="Technical Analysis"
                icon={<LineChart className="h-4 w-4 text-market-blue" />}
                description="Analyze price movements, volume, and technical indicators to identify patterns and potential entry/exit points."
                onClick={() => handleRunAnalysis('technical')}
              />
              
              <AnalysisCard
                title="Risk Analysis"
                icon={<Shield className="h-4 w-4 text-market-indigo" />}
                description="Evaluate the risk profile of your investment, including volatility, beta, drawdowns, and value-at-risk metrics."
                onClick={() => handleRunAnalysis('risk')}
              />
              
              <AnalysisCard
                title="Market Conditions"
                icon={<Compass className="h-4 w-4 text-market-blue" />}
                description="Assess overall market sentiment, macroeconomic indicators, and sector trends affecting your investments."
                onClick={() => handleRunAnalysis('market')}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="animate-scale-in">
            {activeAnalysis && (
              <div className="space-y-6">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToOverview} 
                    className="gap-1"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Overview
                  </Button>
                </div>
                
                {activeAnalysis === 'technical' && <TechnicalAnalysis />}
                {activeAnalysis === 'risk' && <RiskAnalysis />}
                {activeAnalysis === 'market' && <MarketConditions />}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Toolkit;
