// Data for Response Time and Error Rate trends across different time windows

export interface TrendDataPoint {
  timestamp: number;
  value: number;
  baseline: number;
}

// Helper to generate timestamps - now is a function for dynamic updates
const getNow = () => Date.now();
const minute = 60 * 1000;
const hour = 60 * minute;
const day = 24 * hour;

// 1 Hour - data points every 5 minutes (13 points)
export const responseTime1h = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 60 * minute, value: 245, baseline: 270 },
    { timestamp: now - 55 * minute, value: 252, baseline: 270 },
    { timestamp: now - 50 * minute, value: 238, baseline: 270 },
    { timestamp: now - 45 * minute, value: 248, baseline: 270 },
    { timestamp: now - 40 * minute, value: 255, baseline: 270 },
    { timestamp: now - 35 * minute, value: 242, baseline: 270 },
    { timestamp: now - 30 * minute, value: 285, baseline: 270 }, // spike
    { timestamp: now - 25 * minute, value: 240, baseline: 270 },
    { timestamp: now - 20 * minute, value: 235, baseline: 270 },
    { timestamp: now - 15 * minute, value: 250, baseline: 270 },
    { timestamp: now - 10 * minute, value: 245, baseline: 270 },
    { timestamp: now - 5 * minute, value: 248, baseline: 270 },
    { timestamp: now, value: 247, baseline: 270 },
  ];
};

export const errorRate1h = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 60 * minute, value: 1.8, baseline: 2.0 },
    { timestamp: now - 55 * minute, value: 1.9, baseline: 2.0 },
    { timestamp: now - 50 * minute, value: 2.1, baseline: 2.0 },
    { timestamp: now - 45 * minute, value: 1.85, baseline: 2.0 },
    { timestamp: now - 40 * minute, value: 2.0, baseline: 2.0 },
    { timestamp: now - 35 * minute, value: 2.2, baseline: 2.0 },
    { timestamp: now - 30 * minute, value: 2.5, baseline: 2.0 }, // spike
    { timestamp: now - 25 * minute, value: 2.15, baseline: 2.0 },
    { timestamp: now - 20 * minute, value: 2.0, baseline: 2.0 },
    { timestamp: now - 15 * minute, value: 2.1, baseline: 2.0 },
    { timestamp: now - 10 * minute, value: 2.05, baseline: 2.0 },
    { timestamp: now - 5 * minute, value: 2.08, baseline: 2.0 },
    { timestamp: now, value: 2.08, baseline: 2.0 },
  ];
};

// 6 Hours - data points every 30 minutes (13 points)
export const responseTime6h = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 6 * hour, value: 260, baseline: 270 },
    { timestamp: now - 5.5 * hour, value: 255, baseline: 270 },
    { timestamp: now - 5 * hour, value: 248, baseline: 270 },
    { timestamp: now - 4.5 * hour, value: 252, baseline: 270 },
    { timestamp: now - 4 * hour, value: 245, baseline: 270 },
    { timestamp: now - 3.5 * hour, value: 250, baseline: 270 },
    { timestamp: now - 3 * hour, value: 242, baseline: 270 },
    { timestamp: now - 2.5 * hour, value: 238, baseline: 270 },
    { timestamp: now - 2 * hour, value: 255, baseline: 270 },
    { timestamp: now - 1.5 * hour, value: 248, baseline: 270 },
    { timestamp: now - 1 * hour, value: 245, baseline: 270 },
    { timestamp: now - 0.5 * hour, value: 250, baseline: 270 },
    { timestamp: now, value: 247, baseline: 270 },
  ];
};

export const errorRate6h = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 6 * hour, value: 1.95, baseline: 2.0 },
    { timestamp: now - 5.5 * hour, value: 2.0, baseline: 2.0 },
    { timestamp: now - 5 * hour, value: 2.05, baseline: 2.0 },
    { timestamp: now - 4.5 * hour, value: 1.98, baseline: 2.0 },
    { timestamp: now - 4 * hour, value: 2.1, baseline: 2.0 },
    { timestamp: now - 3.5 * hour, value: 2.15, baseline: 2.0 },
    { timestamp: now - 3 * hour, value: 2.2, baseline: 2.0 },
    { timestamp: now - 2.5 * hour, value: 2.08, baseline: 2.0 },
    { timestamp: now - 2 * hour, value: 2.0, baseline: 2.0 },
    { timestamp: now - 1.5 * hour, value: 2.05, baseline: 2.0 },
    { timestamp: now - 1 * hour, value: 2.1, baseline: 2.0 },
    { timestamp: now - 0.5 * hour, value: 2.08, baseline: 2.0 },
    { timestamp: now, value: 2.08, baseline: 2.0 },
  ];
};

// 24 Hours - data points every 2 hours (13 points)
export const responseTime24h = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 24 * hour, value: 265, baseline: 270 },
    { timestamp: now - 22 * hour, value: 258, baseline: 270 },
  { timestamp: now - 20 * hour, value: 252, baseline: 270 },
  { timestamp: now - 18 * hour, value: 248, baseline: 270 },
  { timestamp: now - 16 * hour, value: 255, baseline: 270 },
  { timestamp: now - 14 * hour, value: 250, baseline: 270 },
  { timestamp: now - 12 * hour, value: 245, baseline: 270 },
  { timestamp: now - 10 * hour, value: 242, baseline: 270 },
    { timestamp: now - 8 * hour, value: 248, baseline: 270 },
    { timestamp: now - 6 * hour, value: 252, baseline: 270 },
    { timestamp: now - 4 * hour, value: 245, baseline: 270 },
    { timestamp: now - 2 * hour, value: 250, baseline: 270 },
    { timestamp: now, value: 247, baseline: 270 },
  ];
};

export const errorRate24h = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 24 * hour, value: 2.05, baseline: 2.0 },
    { timestamp: now - 22 * hour, value: 2.0, baseline: 2.0 },
    { timestamp: now - 20 * hour, value: 1.95, baseline: 2.0 },
    { timestamp: now - 18 * hour, value: 2.1, baseline: 2.0 },
    { timestamp: now - 16 * hour, value: 2.15, baseline: 2.0 },
    { timestamp: now - 14 * hour, value: 2.0, baseline: 2.0 },
    { timestamp: now - 12 * hour, value: 2.05, baseline: 2.0 },
    { timestamp: now - 10 * hour, value: 1.98, baseline: 2.0 },
    { timestamp: now - 8 * hour, value: 2.1, baseline: 2.0 },
    { timestamp: now - 6 * hour, value: 2.08, baseline: 2.0 },
    { timestamp: now - 4 * hour, value: 2.0, baseline: 2.0 },
    { timestamp: now - 2 * hour, value: 2.05, baseline: 2.0 },
    { timestamp: now, value: 2.08, baseline: 2.0 },
  ];
};

// 7 Days - data points every 12 hours (15 points)
export const responseTime7d = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 7 * day, value: 268, baseline: 270 },
  { timestamp: now - 6.5 * day, value: 265, baseline: 270 },
  { timestamp: now - 6 * day, value: 260, baseline: 270 },
  { timestamp: now - 5.5 * day, value: 255, baseline: 270 },
  { timestamp: now - 5 * day, value: 258, baseline: 270 },
  { timestamp: now - 4.5 * day, value: 252, baseline: 270 },
  { timestamp: now - 4 * day, value: 248, baseline: 270 },
  { timestamp: now - 3.5 * day, value: 250, baseline: 270 },
  { timestamp: now - 3 * day, value: 245, baseline: 270 },
    { timestamp: now - 2.5 * day, value: 242, baseline: 270 },
    { timestamp: now - 2 * day, value: 248, baseline: 270 },
    { timestamp: now - 1.5 * day, value: 252, baseline: 270 },
    { timestamp: now - 1 * day, value: 245, baseline: 270 },
    { timestamp: now - 0.5 * day, value: 250, baseline: 270 },
    { timestamp: now, value: 247, baseline: 270 },
  ];
};

export const errorRate7d = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 7 * day, value: 1.95, baseline: 2.0 },
    { timestamp: now - 6.5 * day, value: 2.0, baseline: 2.0 },
    { timestamp: now - 6 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now - 5.5 * day, value: 2.1, baseline: 2.0 },
    { timestamp: now - 5 * day, value: 2.0, baseline: 2.0 },
    { timestamp: now - 4.5 * day, value: 2.08, baseline: 2.0 },
    { timestamp: now - 4 * day, value: 2.15, baseline: 2.0 },
    { timestamp: now - 3.5 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now - 3 * day, value: 2.0, baseline: 2.0 },
    { timestamp: now - 2.5 * day, value: 2.1, baseline: 2.0 },
    { timestamp: now - 2 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now - 1.5 * day, value: 2.08, baseline: 2.0 },
    { timestamp: now - 1 * day, value: 2.0, baseline: 2.0 },
    { timestamp: now - 0.5 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now, value: 2.08, baseline: 2.0 },
  ];
};

// 30 Days - data points every 2 days (16 points)
export const responseTime30d = (): TrendDataPoint[] => {
  const now = getNow();
  return [
  { timestamp: now - 30 * day, value: 275, baseline: 270 },
  { timestamp: now - 28 * day, value: 272, baseline: 270 },
  { timestamp: now - 26 * day, value: 268, baseline: 270 },
  { timestamp: now - 24 * day, value: 265, baseline: 270 },
  { timestamp: now - 22 * day, value: 262, baseline: 270 },
  { timestamp: now - 20 * day, value: 258, baseline: 270 },
    { timestamp: now - 18 * day, value: 255, baseline: 270 },
    { timestamp: now - 16 * day, value: 252, baseline: 270 },
    { timestamp: now - 14 * day, value: 250, baseline: 270 },
    { timestamp: now - 12 * day, value: 248, baseline: 270 },
    { timestamp: now - 10 * day, value: 245, baseline: 270 },
    { timestamp: now - 8 * day, value: 248, baseline: 270 },
    { timestamp: now - 6 * day, value: 250, baseline: 270 },
    { timestamp: now - 4 * day, value: 245, baseline: 270 },
    { timestamp: now - 2 * day, value: 248, baseline: 270 },
    { timestamp: now, value: 247, baseline: 270 },
  ];
};

export const errorRate30d = (): TrendDataPoint[] => {
  const now = getNow();
  return [
    { timestamp: now - 30 * day, value: 2.15, baseline: 2.0 },
    { timestamp: now - 28 * day, value: 2.12, baseline: 2.0 },
    { timestamp: now - 26 * day, value: 2.1, baseline: 2.0 },
    { timestamp: now - 24 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now - 22 * day, value: 2.08, baseline: 2.0 },
    { timestamp: now - 20 * day, value: 2.0, baseline: 2.0 },
    { timestamp: now - 18 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now - 16 * day, value: 2.1, baseline: 2.0 },
    { timestamp: now - 14 * day, value: 2.08, baseline: 2.0 },
    { timestamp: now - 12 * day, value: 2.0, baseline: 2.0 },
    { timestamp: now - 10 * day, value: 2.05, baseline: 2.0 },
    { timestamp: now - 8 * day, value: 2.1, baseline: 2.0 },
    { timestamp: now - 6 * day, value: 2.08, baseline: 2.0 },
  { timestamp: now - 4 * day, value: 2.0, baseline: 2.0 },
  { timestamp: now - 2 * day, value: 2.05, baseline: 2.0 },
  { timestamp: now, value: 2.08, baseline: 2.0 },
];

export const getTrendsData = (timeRange: string, metric: 'responseTime' | 'errorRate') => {
  const dataMap = {
    '1h': { responseTime: responseTime1h(), errorRate: errorRate1h() },
    '6h': { responseTime: responseTime6h(), errorRate: errorRate6h() },
    '24h': { responseTime: responseTime24h(), errorRate: errorRate24h() },
    '7d': { responseTime: responseTime7d(), errorRate: errorRate7d() },
    '30d': { responseTime: responseTime30d(), errorRate: errorRate30d() },
  };
  
  return dataMap[timeRange as keyof typeof dataMap]?.[metric] || responseTime1h();
};
