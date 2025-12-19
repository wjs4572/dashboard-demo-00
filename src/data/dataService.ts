// Data service to load performance data from JSON file
// Simulates fetching from backend API

export interface DataPoint {
  timestamp: number;
  value: number;
  baseline: number;
}

export interface SummaryMetric {
  current: number;
  baseline: number;
  unit?: string;
  status: 'success' | 'warning' | 'error';
  trend: 'up' | 'down';
  changePercent: number;
}

export interface PerformanceData {
  lastUpdated: number;
  summaryMetrics: {
    responseTime: SummaryMetric;
    throughput: SummaryMetric;
    errorRate: SummaryMetric;
    cpuUsage: SummaryMetric;
  };
  responseTime: {
    '1h': DataPoint[];
    '6h': DataPoint[];
    '24h': DataPoint[];
    '7d': DataPoint[];
    '30d': DataPoint[];
  };
  errorRate: {
    '1h': DataPoint[];
    '6h': DataPoint[];
    '24h': DataPoint[];
    '7d': DataPoint[];
    '30d': DataPoint[];
  };
}

let cachedData: PerformanceData | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5000; // Cache for 5 seconds before refetching

// Fetch data from PHP API endpoint (works in both dev and production)
export const fetchPerformanceData = async (): Promise<PerformanceData> => {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedData;
  }
  
  try {
    // Always use PHP endpoint - Vite proxy forwards to localhost:8000 in dev
    const response = await fetch('/api/performance-data.php?t=' + now);
    if (!response.ok) {
      throw new Error('Failed to fetch performance data');
    }
    cachedData = await response.json();
    lastFetchTime = now;
    return cachedData!;
  } catch (error) {
    console.error('Error fetching performance data:', error);
    // Return fallback data if fetch fails
    if (cachedData) return cachedData;
    throw error;
  }
};

// Get specific metric data
export const getTrendsData = async (
  timeRange: string,
  metric: 'responseTime' | 'errorRate'
): Promise<DataPoint[]> => {
  const data = await fetchPerformanceData();
  const timeRangeKey = timeRange as keyof typeof data.responseTime;
  return data[metric][timeRangeKey] || data[metric]['1h'];
};

// Get summary metrics
export const getSummaryMetrics = async () => {
  const data = await fetchPerformanceData();
  return data.summaryMetrics;
};

// Force refresh (clears cache)
export const refreshData = () => {
  cachedData = null;
  lastFetchTime = 0;
};
