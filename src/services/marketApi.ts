
import { Stock, MarketIndex, NewsItem, EarningsReport } from '@/models/market';
import { mockStocks, mockMarketIndices, mockMarketNews, mockEarningsReports } from '@/mocks/marketData';

// API configuration
const API_CONFIG = {
  // In a real app, these would be environment variables or configuration settings
  BASE_URL: 'https://api.example.com', // Replace with actual API endpoint
  API_KEY: 'demo',                     // Replace with actual API key
  MOCK_DELAY: 800,                     // Simulated network delay in ms
  USE_MOCK: true                       // Toggle between mock and real API
};

/**
 * Fetches market indices data
 */
export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  if (API_CONFIG.USE_MOCK) {
    // Return mock data with simulated delay
    return new Promise(resolve => {
      setTimeout(() => resolve(mockMarketIndices), API_CONFIG.MOCK_DELAY);
    });
  }

  // Real API implementation would go here
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/market/indices?apiKey=${API_CONFIG.API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch market indices');
    return await response.json();
  } catch (error) {
    console.error('Error fetching market indices:', error);
    throw error;
  }
};

/**
 * Fetches portfolio stocks based on provided symbols
 */
export const fetchPortfolioStocks = async (symbols: string[]): Promise<Stock[]> => {
  if (API_CONFIG.USE_MOCK) {
    // Filter mock data based on requested symbols
    const portfolio = symbols.map(symbol => mockStocks[symbol]).filter(Boolean);
    
    return new Promise(resolve => {
      setTimeout(() => resolve(portfolio), API_CONFIG.MOCK_DELAY);
    });
  }

  // Real API implementation would go here
  try {
    const symbolsParam = symbols.join(',');
    const response = await fetch(`${API_CONFIG.BASE_URL}/stocks?symbols=${symbolsParam}&apiKey=${API_CONFIG.API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch portfolio stocks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolio stocks:', error);
    throw error;
  }
};

/**
 * Fetches market news
 */
export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  if (API_CONFIG.USE_MOCK) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockMarketNews), API_CONFIG.MOCK_DELAY);
    });
  }

  // Real API implementation would go here
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/news?apiKey=${API_CONFIG.API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch market news');
    const data = await response.json();
    
    // Convert string dates to Date objects
    return data.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
};

/**
 * Fetches earnings reports
 */
export const fetchEarningsReports = async (): Promise<EarningsReport[]> => {
  if (API_CONFIG.USE_MOCK) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockEarningsReports), API_CONFIG.MOCK_DELAY);
    });
  }

  // Real API implementation would go here
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/earnings?apiKey=${API_CONFIG.API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch earnings reports');
    const data = await response.json();
    
    // Convert string dates to Date objects
    return data.map((report: any) => ({
      ...report,
      date: new Date(report.date)
    }));
  } catch (error) {
    console.error('Error fetching earnings reports:', error);
    throw error;
  }
};

/**
 * Fetches available stocks for selection
 */
export const fetchAvailableStocks = async (): Promise<Stock[]> => {
  if (API_CONFIG.USE_MOCK) {
    // Use the mock stocks list from our mock data
    return new Promise(resolve => {
      const availableStocks = Object.values(mockStocks).map(({ symbol, name }) => ({ symbol, name }));
      setTimeout(() => resolve(availableStocks), API_CONFIG.MOCK_DELAY);
    });
  }

  // Real API implementation would go here
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/stocks/available?apiKey=${API_CONFIG.API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch available stocks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching available stocks:', error);
    throw error;
  }
};
