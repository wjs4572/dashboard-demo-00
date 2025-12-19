// Data Aggregation Service - simulates backend pre-calculation
// In production, this would be done server-side and fetched via API

import { Transaction, getTransactionData } from './transactionGenerator';
import { chartConfig } from './dataConfig';

export interface TrendDataPoint {
  timestamp: number;
  value: number;
  baseline: number;
}

interface AggregatedData {
  '1h': { responseTime: TrendDataPoint[]; errorRate: TrendDataPoint[] };
  '6h': { responseTime: TrendDataPoint[]; errorRate: TrendDataPoint[] };
  '24h': { responseTime: TrendDataPoint[]; errorRate: TrendDataPoint[] };
  '7d': { responseTime: TrendDataPoint[]; errorRate: TrendDataPoint[] };
  '30d': { responseTime: TrendDataPoint[]; errorRate: TrendDataPoint[] };
}

// Cache for pre-aggregated data
let aggregatedCache: AggregatedData | null = null;
let lastAggregated: number = 0;
const AGGREGATION_INTERVAL = 60 * 1000; // Re-aggregate every minute (simulates backend refresh)

// Aggregate transactions into time buckets
const aggregateTransactions = (
  transactions: Transaction[],
  startTime: number,
  endTime: number,
  bucketSize: number,
  baseline: number
): { responseTime: TrendDataPoint[]; errorRate: TrendDataPoint[] } => {
  const responseBuckets = new Map<number, number[]>();
  const errorBuckets = new Map<number, { total: number; errors: number }>();

  // Filter transactions in time range and bucket them
  transactions
    .filter(t => t.timestamp >= startTime && t.timestamp <= endTime)
    .forEach(t => {
      const bucketTime = Math.floor(t.timestamp / bucketSize) * bucketSize;
      
      // Response time bucket
      if (!responseBuckets.has(bucketTime)) {
        responseBuckets.set(bucketTime, []);
      }
      responseBuckets.get(bucketTime)!.push(t.responseTime);
      
      // Error rate bucket
      if (!errorBuckets.has(bucketTime)) {
        errorBuckets.set(bucketTime, { total: 0, errors: 0 });
      }
      const bucket = errorBuckets.get(bucketTime)!;
      bucket.total++;
      if (t.hasError) bucket.errors++;
    });

  // Create data points from buckets
  const responseTimeData: TrendDataPoint[] = [];
  const errorRateData: TrendDataPoint[] = [];

  // Generate consistent time points even if no data in bucket
  for (let time = startTime; time <= endTime; time += bucketSize) {
    const bucketTime = Math.floor(time / bucketSize) * bucketSize;
    
    // Response time
    const responseTimes = responseBuckets.get(bucketTime) || [];
    const avgResponse = responseTimes.length > 0
      ? responseTimes.reduce((sum, val) => sum + val, 0) / responseTimes.length
      : baseline * 0.9; // Default if no data
    
    responseTimeData.push({
      timestamp: bucketTime,
      value: Math.round(avgResponse),
      baseline: chartConfig.responseTimeBaseline,
    });
    
    // Error rate
    const errorBucket = errorBuckets.get(bucketTime);
    const errorRate = errorBucket && errorBucket.total > 0
      ? (errorBucket.errors / errorBucket.total) * 100
      : chartConfig.errorRateBaseline * 0.9; // Default if no data
    
    errorRateData.push({
      timestamp: bucketTime,
      value: parseFloat(errorRate.toFixed(2)),
      baseline: chartConfig.errorRateBaseline,
    });
  }

  return { responseTime: responseTimeData, errorRate: errorRateData };
};

// Pre-calculate all time window aggregations (simulates backend processing)
const preAggregateAllTimeWindows = (): AggregatedData => {
  const transactions = getTransactionData(chartConfig.responseTimeBaseline);
  const now = Date.now();
  
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  return {
    '1h': aggregateTransactions(transactions, now - hour, now, 5 * minute, chartConfig.responseTimeBaseline),
    '6h': aggregateTransactions(transactions, now - 6 * hour, now, 30 * minute, chartConfig.responseTimeBaseline),
    '24h': aggregateTransactions(transactions, now - 24 * hour, now, 2 * hour, chartConfig.responseTimeBaseline),
    '7d': aggregateTransactions(transactions, now - 7 * day, now, 12 * hour, chartConfig.responseTimeBaseline),
    '30d': aggregateTransactions(transactions, now - 30 * day, now, 2 * day, chartConfig.responseTimeBaseline),
  };
};

// Get pre-aggregated data (simulates API call to backend)
export const getTrendsData = (timeRange: string, metric: 'responseTime' | 'errorRate'): TrendDataPoint[] => {
  const now = Date.now();
  
  // Refresh aggregated data if cache expired (simulates backend refresh cycle)
  if (!aggregatedCache || (now - lastAggregated) > AGGREGATION_INTERVAL) {
    aggregatedCache = preAggregateAllTimeWindows();
    lastAggregated = now;
  }
  
  const timeRangeKey = timeRange as keyof AggregatedData;
  return aggregatedCache[timeRangeKey]?.[metric] || aggregatedCache['1h'][metric];
};

// Force refresh (simulates manual backend data refresh)
export const refreshAggregatedData = () => {
  aggregatedCache = null;
  lastAggregated = 0;
};
