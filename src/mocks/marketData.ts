
import { Stock, MarketIndex, NewsItem, EarningsReport } from '@/models/market';

// Mock stock data
export const mockStocks: Record<string, Stock> = {
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
  DIS: { symbol: "DIS", name: "The Walt Disney Co.", price: 104.12, change: 1.25, changePercent: 1.22 },
  PFE: { symbol: "PFE", name: "Pfizer Inc.", price: 28.37, change: -0.15, changePercent: -0.53 },
  NKE: { symbol: "NKE", name: "Nike Inc.", price: 97.84, change: 0.32, changePercent: 0.33 },
  KO: { symbol: "KO", name: "The Coca-Cola Co.", price: 62.15, change: 0.42, changePercent: 0.68 },
  MCD: { symbol: "MCD", name: "McDonald's Corp.", price: 295.28, change: 1.38, changePercent: 0.47 },
};

// Mock market indices data
export const mockMarketIndices: MarketIndex[] = [
  { name: "S&P 500", value: 4892.37, change: 12.46, changePercent: 0.25 },
  { name: "Nasdaq", value: 15473.89, change: -45.23, changePercent: -0.29 },
  { name: "Dow Jones", value: 38654.12, change: 65.34, changePercent: 0.17 },
  { name: "Russell 2000", value: 1973.41, change: -8.91, changePercent: -0.45 },
];

// Mock news data
export const mockMarketNews: NewsItem[] = [
  { 
    title: "Fed signals potential interest rate cuts in 2024",
    source: "Financial Times",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    url: "#",
    category: 'economic'
  },
  { 
    title: "Tech sector facing semiconductor supply chain challenges",
    source: "Bloomberg",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    url: "#",
    category: 'industry'
  },
  { 
    title: "Tesla announces new battery technology breakthrough",
    source: "Reuters",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    url: "#",
    category: 'company'
  },
  { 
    title: "Consumer spending up 0.8% in latest economic report",
    source: "CNBC",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    url: "#",
    category: 'economic'
  },
  { 
    title: "Apple supplier reports better than expected production figures",
    source: "Wall Street Journal",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    url: "#",
    category: 'company'
  },
];

// Mock earnings reports data
export const mockEarningsReports: EarningsReport[] = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    timeOfDay: "After Market",
    eps: { actual: 2.18, expected: 2.10 },
    revenue: { actual: 119.6e9, expected: 117.8e9 },
    reported: true
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corp.", 
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    timeOfDay: "After Market",
    eps: { actual: 2.93, expected: 2.77 },
    revenue: { actual: 62.0e9, expected: 61.1e9 },
    reported: true
  },
  { 
    symbol: "AMZN", 
    name: "Amazon.com Inc.", 
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    timeOfDay: "After Market",
    reported: false
  },
  { 
    symbol: "TSLA", 
    name: "Tesla Inc.", 
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    timeOfDay: "After Market",
    reported: false
  },
  { 
    symbol: "NVDA", 
    name: "NVIDIA Corp.", 
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    timeOfDay: "After Market",
    reported: false
  },
];

// List of all available stocks for selector
export const allStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'BAC', name: 'Bank of America Corp.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'DIS', name: 'The Walt Disney Co.' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'NKE', name: 'Nike Inc.' },
  { symbol: 'KO', name: 'The Coca-Cola Co.' },
  { symbol: 'MCD', name: 'McDonald\'s Corp.' },
];
