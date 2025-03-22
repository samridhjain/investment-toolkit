
// This file would contain functions to fetch and process market data
// For the MVP, we're using mock data, but this would be replaced with real API calls

export type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

export type MarketIndex = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
};

export type NewsItem = {
  title: string;
  source: string;
  timestamp: Date;
  url: string;
  category: 'economic' | 'industry' | 'company';
};

export type EarningsReport = {
  symbol: string;
  name: string;
  date: Date;
  timeOfDay: 'Before Market' | 'After Market';
  eps?: { actual: number; expected: number };
  revenue?: { actual: number; expected: number };
  reported: boolean;
};

// Mock function to fetch market indices - would be replaced with API call
export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  // In a real app, this would fetch from a market data API
  const indices = [
    { name: "S&P 500", value: 4892.37, change: 12.46, changePercent: 0.25 },
    { name: "Nasdaq", value: 15473.89, change: -45.23, changePercent: -0.29 },
    { name: "Dow Jones", value: 38654.12, change: 65.34, changePercent: 0.17 },
    { name: "Russell 2000", value: 1973.41, change: -8.91, changePercent: -0.45 },
  ];
  
  return new Promise(resolve => {
    setTimeout(() => resolve(indices), 500);
  });
};

// Mock function to fetch portfolio stocks - would be replaced with API call
export const fetchPortfolioStocks = async (symbols: string[]): Promise<Stock[]> => {
  // In a real app, this would fetch from a market data API based on user's portfolio
  const stockData: Record<string, Stock> = {
    AAPL: { symbol: "AAPL", name: "Apple Inc.", price: 192.53, change: 2.31, changePercent: 1.21 },
    MSFT: { symbol: "MSFT", name: "Microsoft Corp.", price: 403.78, change: 5.62, changePercent: 1.41 },
    GOOGL: { symbol: "GOOGL", name: "Alphabet Inc.", price: 181.21, change: 1.45, changePercent: 0.80 },
    AMZN: { symbol: "AMZN", name: "Amazon.com Inc.", price: 171.83, change: -3.25, changePercent: -1.86 },
    META: { symbol: "META", name: "Meta Platforms Inc.", price: 482.59, change: 7.29, changePercent: 1.53 },
    TSLA: { symbol: "TSLA", name: "Tesla Inc.", price: 193.57, change: -7.14, changePercent: -3.56 },
    NVDA: { symbol: "NVDA", name: "NVIDIA Corp.", price: 721.33, change: 15.76, changePercent: 2.23 },
    JPM: { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 186.42, change: 0.87, changePercent: 0.47 },
    BAC: { symbol: "BAC", name: "Bank of America Corp.", price: 39.24, change: -0.32, changePercent: -0.81 },
    WMT: { symbol: "WMT", name: "Walmart Inc.", price: 59.84, change: 0.25, changePercent: 0.42 },
  };
  
  const portfolio = symbols.map(symbol => stockData[symbol]).filter(Boolean);
  
  return new Promise(resolve => {
    setTimeout(() => resolve(portfolio), 800);
  });
};

// Mock function to fetch news - would be replaced with API call
export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  // In a real app, this would fetch from a news API
  const news = [
    { 
      title: "Fed signals potential interest rate cuts in 2024",
      source: "Financial Times",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      url: "#",
      category: 'economic' as const
    },
    { 
      title: "Tech sector facing semiconductor supply chain challenges",
      source: "Bloomberg",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      url: "#",
      category: 'industry' as const
    },
    { 
      title: "Tesla announces new battery technology breakthrough",
      source: "Reuters",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      url: "#",
      category: 'company' as const
    },
    { 
      title: "Consumer spending up 0.8% in latest economic report",
      source: "CNBC",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      url: "#",
      category: 'economic' as const
    },
    { 
      title: "Apple supplier reports better than expected production figures",
      source: "Wall Street Journal",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      url: "#",
      category: 'company' as const
    },
  ];
  
  return new Promise(resolve => {
    setTimeout(() => resolve(news), 600);
  });
};

// Mock function to fetch earnings reports - would be replaced with API call
export const fetchEarningsReports = async (): Promise<EarningsReport[]> => {
  // In a real app, this would fetch from a financial data API
  const now = new Date();
  
  const reports = [
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      timeOfDay: "After Market" as const,
      eps: { actual: 2.18, expected: 2.10 },
      revenue: { actual: 119.6e9, expected: 117.8e9 },
      reported: true
    },
    { 
      symbol: "MSFT", 
      name: "Microsoft Corp.", 
      date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      timeOfDay: "After Market" as const,
      eps: { actual: 2.93, expected: 2.77 },
      revenue: { actual: 62.0e9, expected: 61.1e9 },
      reported: true
    },
    { 
      symbol: "AMZN", 
      name: "Amazon.com Inc.", 
      date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      timeOfDay: "After Market" as const,
      reported: false
    },
    { 
      symbol: "TSLA", 
      name: "Tesla Inc.", 
      date: new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000),
      timeOfDay: "After Market" as const,
      reported: false
    },
    { 
      symbol: "NVDA", 
      name: "NVIDIA Corp.", 
      date: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      timeOfDay: "After Market" as const,
      reported: false
    },
  ];
  
  return new Promise(resolve => {
    setTimeout(() => resolve(reports), 700);
  });
};

// Utility functions
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  }
  
  return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
};
