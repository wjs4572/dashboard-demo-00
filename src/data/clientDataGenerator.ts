// Client-side data generator for production deployment
// Generates data dynamically in the browser without needing a backend
// Note: This file is not currently used - PHP backend is used instead

import { defaultConfig } from './dataConfig';

const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

interface DataPoint {
  timestamp: number;
  value: number;
}

interface SummaryMetric {
  current: number;
  baseline: number;
  unit: string;
  status: 'success' | 'warning' | 'error';
  trend: 'up' | 'down';
  changePercent: number;
}

interface TimeSeriesData {
  '1h': DataPoint[];
  '6h': DataPoint[];
  '24h': DataPoint[];
  '7d': DataPoint[];
  '30d': DataPoint[];
}

export interface PerformanceData {
  lastUpdated: number;
  summaryMetrics: {
    responseTime: SummaryMetric;
    throughput: SummaryMetric;
    errorRate: SummaryMetric;
    cpuUsage: SummaryMetric;
  };
  responseTime: TimeSeriesData;
  errorRate: TimeSeriesData;
}

// Generate time series data for a specific window
const generateTimeSeriesData = (
  windowMinutes: number,
  intervalMinutes: number,
  metricType: 'responseTime' | 'errorRate'
): DataPoint[] => {
  const config = defaultConfig;
  const now = Date.now();
  const data: DataPoint[] = [];
  const numPoints = Math.floor(windowMinutes / intervalMinutes);
  
  for (let i = 0; i < numPoints; i++) {
    const timestamp = now - (numPoints - i - 1) * intervalMinutes * 60 * 1000;
    
    let value: number;
    if (metricType === 'responseTime') {
      // Generate response time between 100ms and baseline (270ms)
      const baseline = config.responseTime.baseline;
      value = randomBetween(100, baseline * 1.2);
    } else {
      // Generate error rate between 1.5% and 2.5%
      const baseline = config.errorRate.baseline;
      value = randomBetween(baseline * 0.75, baseline * 1.25);
    }
    
    data.push({ timestamp, value });
  }
  
  return data;
};

// Generate summary metric
const generateSummaryMetric = (
  current: number,
  baseline: number,
  unit: string
): SummaryMetric => {
  const changePercent = ((current - baseline) / baseline) * 100;
  let status: 'success' | 'warning' | 'error';
  
  if (Math.abs(changePercent) < 5) {
    status = 'success';
  } else if (Math.abs(changePercent) < 15) {
    status = 'warning';
  } else {
    status = 'error';
  }
  
  return {
    current,
    baseline,
    unit,
    status,
    trend: current > baseline ? 'up' : 'down',
    changePercent: Math.abs(changePercent)
  };
};

// Generate complete performance data
export const generatePerformanceData = (): PerformanceData => {
  const config = defaultConfig;
  
  // Generate time series for all windows
  const responseTime: TimeSeriesData = {
    '1h': generateTimeSeriesData(60, 5, 'responseTime'),
    '6h': generateTimeSeriesData(360, 30, 'responseTime'),
    '24h': generateTimeSeriesData(1440, 120, 'responseTime'),
    '7d': generateTimeSeriesData(10080, 720, 'responseTime'),
    '30d': generateTimeSeriesData(43200, 2880, 'responseTime')
  };
  
  const errorRate: TimeSeriesData = {
    '1h': generateTimeSeriesData(60, 5, 'errorRate'),
    '6h': generateTimeSeriesData(360, 30, 'errorRate'),
    '24h': generateTimeSeriesData(1440, 120, 'errorRate'),
    '7d': generateTimeSeriesData(10080, 720, 'errorRate'),
    '30d': generateTimeSeriesData(43200, 2880, 'errorRate')
  };
  
  // Calculate current values from latest 1h data
  const currentResponseTime = responseTime['1h'][responseTime['1h'].length - 1]?.value || config.responseTime.baseline;
  const currentErrorRate = errorRate['1h'][errorRate['1h'].length - 1]?.value || config.errorRate.baseline;
  
  // Generate summary metrics
  const summaryMetrics = {
    responseTime: generateSummaryMetric(
      currentResponseTime,
      config.responseTime.baseline,
      'ms'
    ),
    throughput: generateSummaryMetric(
      randomBetween(980, 1020),
      1000,
      'req/s'
    ),
    errorRate: generateSummaryMetric(
      currentErrorRate,
      config.errorRate.baseline,
      '%'
    ),
    cpuUsage: generateSummaryMetric(
      randomBetween(55, 75),
      65,
      '%'
    )
  };
  
  return {
    lastUpdated: Date.now(),
    summaryMetrics,
    responseTime,
    errorRate
  };
};

// Cache for generated data with TTL
let cachedData: PerformanceData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5000; // 5 seconds

export const getPerformanceData = (): PerformanceData => {
  const now = Date.now();
  
  if (!cachedData || now - cacheTimestamp > CACHE_DURATION) {
    cachedData = generatePerformanceData();
    cacheTimestamp = now;
  }
  
  return cachedData;
};

// Force refresh the cache
export const refreshPerformanceData = (): PerformanceData => {
  cachedData = generatePerformanceData();
  cacheTimestamp = Date.now();
  return cachedData;
};
