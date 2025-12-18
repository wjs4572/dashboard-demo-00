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
    normal: 'border-[#085665]',
    warning: 'border-yellow-500',
    critical: 'border-[#CC2936]'
  };

  const statusBgColors = {
    normal: 'bg-[#085665]/5',
    warning: 'bg-yellow-50',
    critical: 'bg-red-50'
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

  const changeColor = isGoodChange() ? 'text-green-600' : 'text-[#CC2936]';
  const changeIcon = change >= 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line';

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border-2 p-6 transition-all cursor-pointer hover:shadow-lg ${
        isSelected ? `${statusColors[status]} shadow-lg` : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-medium text-[#1E293B]">{title}</h3>
        <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${statusBgColors[status]}`}>
          {status === 'normal' && <span className="text-[#085665]">Normal</span>}
          {status === 'warning' && <span className="text-yellow-700">Warning</span>}
          {status === 'critical' && <span className="text-[#CC2936]">Critical</span>}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-semibold text-[#1E293B]">{value}</span>
          <span className="text-lg text-gray-500">{unit}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <i className={`${changeIcon} ${changeColor} text-base`}></i>
          <span className={`font-medium ${changeColor}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-gray-500">vs baseline</span>
        </div>
        <span className="text-gray-500">Baseline: {baseline}</span>
      </div>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-[#2563EB] font-medium">
            <span>View Details</span>
            <i className="ri-arrow-right-line"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PrimaryMetrics({ onMetricClick, selectedMetric }: PrimaryMetricsProps) {
  const metrics = [
    {
      id: 'response-time',
      title: 'Average Response Time',
      value: '247',
      unit: 'ms',
      change: -8.3,
      status: 'normal' as const,
      baseline: '270ms'
    },
    {
      id: 'throughput',
      title: 'Request Throughput',
      value: '12.4',
      unit: 'K/min',
      change: 15.2,
      status: 'normal' as const,
      baseline: '10.8K'
    },
    {
      id: 'error-rate',
      title: 'Error Rate',
      value: '2.08',
      unit: '%',
      change: 4.0,
      status: 'warning' as const,
      baseline: '2.0%'
    },
    {
      id: 'cpu-usage',
      title: 'CPU Utilization',
      value: '78',
      unit: '%',
      change: 12.5,
      status: 'warning' as const,
      baseline: '69%'
    }
  ];

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#1E293B] mb-2">Primary Metrics Overview</h2>
        <p className="text-sm text-gray-600">Click any metric to view detailed breakdown and contributing factors</p>
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
