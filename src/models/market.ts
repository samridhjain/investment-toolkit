
// Market data type definitions
export type Stock = {
  symbol: string;
  name: string;
  price?: number;
  change?: number;
  changePercent?: number;
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
