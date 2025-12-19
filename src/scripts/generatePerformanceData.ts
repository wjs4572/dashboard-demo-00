// Script to generate performance-data.json with simulated metrics
// Run this periodically to simulate backend data updates

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const generateData = () => {
  const now = Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const responseTimeBaseline = 270;
  const errorRateBaseline = 2.0;

  // Generate time series data
  const generate1h = () => {
    const data = [];
    for (let i = 12; i >= 0; i--) {
      const timestamp = now - i * 5 * minute;
      data.push({
        timestamp,
        value: Math.round(randomBetween(100, responseTimeBaseline)),
        baseline: responseTimeBaseline
      });
    }
    return data;
  };

  const generate6h = () => {
    const data = [];
    for (let i = 12; i >= 0; i--) {
      const timestamp = now - i * 0.5 * hour;
      data.push({
        timestamp,
        value: Math.round(randomBetween(100, responseTimeBaseline)),
        baseline: responseTimeBaseline
      });
    }
    return data;
  };

  const generate24h = () => {
    const data = [];
    for (let i = 12; i >= 0; i--) {
      const timestamp = now - i * 2 * hour;
      data.push({
        timestamp,
        value: Math.round(randomBetween(100, responseTimeBaseline)),
        baseline: responseTimeBaseline
      });
    }
    return data;
  };

  const generate7d = () => {
    const data = [];
    for (let i = 14; i >= 0; i--) {
      const timestamp = now - i * 0.5 * day;
      data.push({
        timestamp,
        value: Math.round(randomBetween(100, responseTimeBaseline)),
        baseline: responseTimeBaseline
      });
    }
    return data;
  };

  const generate30d = () => {
    const data = [];
    for (let i = 15; i >= 0; i--) {
      const timestamp = now - i * 2 * day;
      data.push({
        timestamp,
        value: Math.round(randomBetween(100, responseTimeBaseline)),
        baseline: responseTimeBaseline
      });
    }
    return data;
  };

  const generateErrorRate = (timePoints: number, interval: number) => {
    const data = [];
    for (let i = timePoints; i >= 0; i--) {
      const timestamp = now - i * interval;
      data.push({
        timestamp,
        value: parseFloat(randomBetween(1.5, errorRateBaseline + 0.5).toFixed(2)),
        baseline: errorRateBaseline
      });
    }
    return data;
  };

  const currentResponseTime = Math.round(randomBetween(200, responseTimeBaseline));
  const currentErrorRate = parseFloat(randomBetween(1.7, 2.3).toFixed(2));
  
  return {
    lastUpdated: now,
    summaryMetrics: {
      responseTime: {
        current: currentResponseTime,
        baseline: responseTimeBaseline,
        status: currentResponseTime > responseTimeBaseline ? 'warning' : 'success',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        changePercent: parseFloat((Math.random() * 10).toFixed(1))
      },
      throughput: {
        current: Math.round(randomBetween(450, 550)),
        baseline: 500,
        unit: 'req/s',
        status: 'success',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        changePercent: parseFloat((Math.random() * 5).toFixed(1))
      },
      errorRate: {
        current: currentErrorRate,
        baseline: errorRateBaseline,
        unit: '%',
        status: currentErrorRate > errorRateBaseline ? 'warning' : 'success',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        changePercent: parseFloat((Math.random() * 3).toFixed(1))
      },
      cpuUsage: {
        current: parseFloat(randomBetween(45, 75).toFixed(1)),
        baseline: 80,
        unit: '%',
        status: 'success',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        changePercent: parseFloat((Math.random() * 5).toFixed(1))
      }
    },
    responseTime: {
      '1h': generate1h(),
      '6h': generate6h(),
      '24h': generate24h(),
      '7d': generate7d(),
      '30d': generate30d()
    },
    errorRate: {
      '1h': generateErrorRate(12, 5 * minute),
      '6h': generateErrorRate(12, 0.5 * hour),
      '24h': generateErrorRate(12, 2 * hour),
      '7d': generateErrorRate(14, 0.5 * day),
      '30d': generateErrorRate(15, 2 * day)
    }
  };
};

const outputPath = path.join(__dirname, '../../public/data/performance-data.json');
const outputDir = path.dirname(outputPath);

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate and save data
const data = generateData();
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`Generated performance-data.json at ${new Date().toLocaleTimeString()}`);
