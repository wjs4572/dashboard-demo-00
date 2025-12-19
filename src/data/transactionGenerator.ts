// Transaction-level data generator for performance metrics

export interface Transaction {
  timestamp: number;
  responseTime: number;
  hasError: boolean;
}

// Generate random value between min and max
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate 30 days worth of transaction data (multiple per minute)
export const generateTransactionData = (baseline: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  
  // Generate transactions every ~10-15 seconds for 30 days
  // This gives us roughly 4-6 transactions per minute
  for (let timestamp = thirtyDaysAgo; timestamp <= now; timestamp += randomBetween(10000, 15000)) {
    const responseTime = randomBetween(100, baseline);
    const hasError = Math.random() < 0.02; // 2% error rate on average
    
    transactions.push({
      timestamp,
      responseTime,
      hasError,
    });
  }
  
  return transactions;
};

// Cache for transaction data
let transactionCache: Transaction[] | null = null;
let lastGenerated: number = 0;
const CACHE_DURATION = 60 * 1000; // Refresh every minute

export const getTransactionData = (baseline: number): Transaction[] => {
  const now = Date.now();
  
  // Regenerate if cache is empty or expired
  if (!transactionCache || (now - lastGenerated) > CACHE_DURATION) {
    transactionCache = generateTransactionData(baseline);
    lastGenerated = now;
  }
  
  return transactionCache;
};

// Clear cache to force regeneration
export const clearTransactionCache = () => {
  transactionCache = null;
  lastGenerated = 0;
};
