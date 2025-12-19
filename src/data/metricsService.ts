// Data service to load pre-aggregated metrics from JSON file
// Simulates fetching from backend API

export interface TrendDataPoint {
  timestamp: number;
  value: number;
  baseline: number;
}

interface MetricsData {
  responseTime: {
    '1h': TrendDataPoint[];
    '6h': TrendDataPoint[];
    '24h': TrendDataPoint[];
    '7d': TrendDataPoint[];
    '30d': TrendDataPoint[];
  };
  errorRate: {
    '1h': TrendDataPoint[];
    '6h': TrendDataPoint[];
    '24h': TrendDataPoint[];
    '7d': TrendDataPoint[];
    '30d': TrendDataPoint[];
  };
  lastUpdated: number;
  refreshInterval: number;
}

let cachedData: MetricsData | null = null;
let lastFetch: number = 0;

// Fetch metrics data from JSON file (simulates API call)
const fetchMetricsData = async (): Promise<MetricsData> => {
  try {
    const response = await fetch('/data/metrics.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching metrics data:', error);
    throw error;
  }
};

// Get trends data for specific time range and metric
export const getTrendsData = async (
  timeRange: string,
  metric: 'responseTime' | 'errorRate'
): Promise<TrendDataPoint[]> => {
  const now = Date.now();
  
  // Fetch fresh data if cache is empty or refresh interval has passed
  if (!cachedData || (now - lastFetch) > (cachedData.refreshInterval || 60000)) {
    cachedData = await fetchMetricsData();
    lastFetch = now;
  }
  
  const timeRangeKey = timeRange as '1h' | '6h' | '24h' | '7d' | '30d';
  return cachedData[metric][timeRangeKey] || cachedData[metric]['1h'];
};

// Force refresh data (useful for manual refresh)
export const refreshMetrics = async (): Promise<void> => {
  cachedData = null;
  lastFetch = 0;
};

// Get last updated timestamp
export const getLastUpdated = (): number | null => {
  return cachedData?.lastUpdated || null;
};
