
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MarketSummary from '@/components/dashboard/MarketSummary';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import NewsHighlights from '@/components/dashboard/NewsHighlights';
import EarningsReport from '@/components/dashboard/EarningsReport';
import StockSelector from '@/components/ui/StockSelector';
import { fetchMarketIndices, fetchPortfolioStocks, fetchMarketNews, fetchEarningsReports } from '@/utils/marketData';
import { useToast } from '@/components/ui/use-toast';

const DEFAULT_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
];

const Index = () => {
  const [stocks, setStocks] = useState(DEFAULT_STOCKS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, these would be API calls to fetch the latest data
      await Promise.all([
        fetchMarketIndices(),
        fetchPortfolioStocks(stocks.map(s => s.symbol)),
        fetchMarketNews(),
        fetchEarningsReports()
      ]);
      
      setLastUpdated(new Date());
      toast({
        title: "Data refreshed",
        description: "Latest market data has been loaded",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error refreshing data",
        description: "Unable to fetch the latest market data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    // Set up auto-refresh every 5 minutes in a real app
    // const interval = setInterval(fetchData, 5 * 60 * 1000);
    // return () => clearInterval(interval);
  }, [stocks]);
  
  const goToToolkit = () => {
    navigate('/toolkit');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Morning Call</h1>
            <p className="text-muted-foreground mt-1">
              Your daily market overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchData} 
              disabled={isLoading}
              className="gap-1"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={goToToolkit}
              size="sm"
              className="gap-1"
            >
              Investment Toolkit
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Stocks in Your Portfolio</h2>
            <p className="text-sm text-muted-foreground">Select the stocks you want to track</p>
          </div>
          <StockSelector selectedStocks={stocks} onStocksChange={setStocks} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <MarketSummary />
          </div>
          
          <div className="col-span-1 md:col-span-2 h-full">
            <PortfolioOverview />
          </div>
          
          <div className="col-span-1 h-full">
            <EarningsReport />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <NewsHighlights />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
