import React, { useState, useEffect } from 'react';
import { getSummaryMetrics } from '@/data/dataService';

interface PrimaryMetricsProps {
  onMetricClick: (metricId: string) => void;
  selectedMetric: string | null;
}

interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  unit: string;
  change: number;
  status: 'normal' | 'warning' | 'critical';
  baseline: string;
  onClick: () => void;
  isSelected: boolean;
}

function MetricCard({ id, title, value, unit, change, status, baseline, onClick, isSelected }: MetricCardProps) {
  const statusColors = {
    normal: 'border-[#085665] dark:border-teal-500',
    warning: 'border-yellow-500',
    critical: 'border-[#CC2936] dark:border-red-500'
  };

  const statusBgColors = {
    normal: 'bg-[#085665]/5 dark:bg-teal-500/10',
    warning: 'bg-yellow-50 dark:bg-yellow-500/10',
    critical: 'bg-red-50 dark:bg-red-500/10'
  };

  const statusTextColors = {
    normal: 'text-[#085665] dark:text-teal-400',
    warning: 'text-yellow-700 dark:text-yellow-400',
    critical: 'text-[#CC2936] dark:text-red-400'
  };

  // Determine if change is good or bad based on metric type
  const isGoodChange = () => {
    if (id === 'response-time') {
      // For response time, negative change (decrease) is good
      return change < 0;
    } else {
      // For error-rate, cpu-usage, and throughput, positive change is bad
      // (throughput increase is good, but we'll treat it as neutral/good)
      if (id === 'throughput') {
        return change > 0;
      }
      // For error-rate and cpu-usage, negative change (decrease) is good
      return change < 0;
    }
  };

  const changeColor = isGoodChange() ? 'text-green-600 dark:text-green-400' : 'text-[#CC2936] dark:text-red-400';
  const changeIcon = change >= 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line';

  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl border p-6 transition-all cursor-pointer hover:shadow-lg ${
        isSelected ? `${statusColors[status]} shadow-lg` : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-medium text-[#1E293B] dark:text-white">{title}</h3>
        <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${statusBgColors[status]}`}>
          {status === 'normal' && <span className={statusTextColors[status]}>Normal</span>}
          {status === 'warning' && <span className={statusTextColors[status]}>Warning</span>}
          {status === 'critical' && <span className={statusTextColors[status]}>Critical</span>}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-semibold text-[#1E293B] dark:text-white">{value}</span>
          <span className="text-lg text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <i className={`${changeIcon} ${changeColor} text-base`}></i>
          <span className={`font-medium ${changeColor}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-gray-500 dark:text-gray-400">vs baseline</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">Baseline: {baseline}</span>
      </div>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-[#2563EB] dark:text-blue-400 font-medium">
            <span>Viewing Details Below</span>
            <i className="ri-arrow-down-line"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PrimaryMetrics({ onMetricClick, selectedMetric }: PrimaryMetricsProps) {
  const [metrics, setMetrics] = useState([
    {
      id: 'response-time',
      title: 'Average Response Time',
      value: '...',
      unit: 'ms',
      change: 0,
      status: 'normal' as const,
      baseline: '270ms'
    },
    {
      id: 'throughput',
      title: 'Request Throughput',
      value: '...',
      unit: 'K/min',
      change: 0,
      status: 'normal' as const,
      baseline: '1.0K'
    },
    {
      id: 'error-rate',
      title: 'Error Rate',
      value: '...',
      unit: '%',
      change: 0,
      status: 'normal' as const,
      baseline: '2.0%'
    },
    {
      id: 'cpu-usage',
      title: 'CPU Utilization',
      value: '...',
      unit: '%',
      change: 0,
      status: 'normal' as const,
      baseline: '65%'
    }
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const summaryMetrics = await getSummaryMetrics();
        
        setMetrics([
          {
            id: 'response-time',
            title: 'Average Response Time',
            value: Math.round(summaryMetrics.responseTime.current).toString(),
            unit: 'ms',
            change: summaryMetrics.responseTime.changePercent * (summaryMetrics.responseTime.trend === 'up' ? 1 : -1),
            status: summaryMetrics.responseTime.status as 'normal' | 'warning' | 'critical',
            baseline: `${summaryMetrics.responseTime.baseline}ms`
          },
          {
            id: 'throughput',
            title: 'Request Throughput',
            value: (summaryMetrics.throughput.current / 1000).toFixed(1),
            unit: 'K/min',
            change: summaryMetrics.throughput.changePercent * (summaryMetrics.throughput.trend === 'up' ? 1 : -1),
            status: summaryMetrics.throughput.status as 'normal' | 'warning' | 'critical',
            baseline: `${(summaryMetrics.throughput.baseline / 1000).toFixed(1)}K`
          },
          {
            id: 'error-rate',
            title: 'Error Rate',
            value: summaryMetrics.errorRate.current.toFixed(2),
            unit: '%',
            change: summaryMetrics.errorRate.changePercent * (summaryMetrics.errorRate.trend === 'up' ? 1 : -1),
            status: summaryMetrics.errorRate.status as 'normal' | 'warning' | 'critical',
            baseline: `${summaryMetrics.errorRate.baseline}%`
          },
          {
            id: 'cpu-usage',
            title: 'CPU Utilization',
            value: Math.round(summaryMetrics.cpuUsage.current).toString(),
            unit: '%',
            change: summaryMetrics.cpuUsage.changePercent * (summaryMetrics.cpuUsage.trend === 'up' ? 1 : -1),
            status: summaryMetrics.cpuUsage.status as 'normal' | 'warning' | 'critical',
            baseline: `${summaryMetrics.cpuUsage.baseline}%`
          }
        ]);
      } catch (error) {
        console.error('Error fetching summary metrics:', error);
      }
    };

    fetchMetrics();
    
    // Refetch every minute
    const timer = setInterval(fetchMetrics, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-2">Primary Metrics Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Click any metric to view detailed breakdown and contributing factors</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            {...metric}
            onClick={() => onMetricClick(metric.id)}
            isSelected={selectedMetric === metric.id}
          />
        ))}
      </div>
    </section>
  );
}
