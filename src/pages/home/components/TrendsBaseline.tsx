import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getTrendsData, type DataPoint } from '@/data/dataService';

export default function TrendsBaseline() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [responseTimeData, setResponseTimeData] = useState<DataPoint[]>([]);
  const [errorRateData, setErrorRateData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartsVisible, setChartsVisible] = useState(false);

  // Fetch data when time range changes or on interval
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setChartsVisible(false); // Fade out before loading new data
      try {
        const [responseData, errorData] = await Promise.all([
          getTrendsData(selectedTimeRange, 'responseTime'),
          getTrendsData(selectedTimeRange, 'errorRate')
        ]);
        setResponseTimeData(responseData);
        setErrorRateData(errorData);
        // Small delay to ensure data is set before fade-in
        setTimeout(() => setChartsVisible(true), 50);
      } catch (error) {
        console.error('Error fetching trends data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refetch every minute to get updated data
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      fetchData();
    }, 60000);
    
    return () => clearInterval(timer);
  }, [selectedTimeRange]);

  const timeRanges = [
    { id: '1h', label: '1H' },
    { id: '6h', label: '6H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' }
  ];

  // Format timestamp for X-axis based on time range
  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp);
    
    switch (selectedTimeRange) {
      case '1h':
      case '6h':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      case '24h':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      case '7d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '30d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {date.toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(entry.name.includes('%') ? 2 : 0)}{entry.name.includes('ms') ? 'ms' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Split data into segments - only lines leading TO violations are red
  const createSegments = (data: any[], baseline: number) => {
    const redSegments: any[] = [];
    
    for (let i = 0; i < data.length - 1; i++) {
      const current = data[i];
      const next = data[i + 1];
      
      // Line from current to next is red ONLY if next point is above baseline
      if (next.value > baseline) {
        // Create a mini-dataset with just these two points for this segment
        redSegments.push({
          data: data.map((point, idx) => {
            if (idx === i || idx === i + 1) {
              return point;
            }
            return { ...point, value: null };
          })
        });
      }
    }
    
    return redSegments;
  };

  const responseTimeRedSegments = createSegments(responseTimeData, 270);
  const errorRateRedSegments = createSegments(errorRateData, 2.0);

  return (
    <section className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-1">Trends and Baseline Comparison</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedTimeRange === '1h' && 'Rolling 1-hour window showing recent performance patterns'}
              {selectedTimeRange === '6h' && 'Last 6 hours of performance data'}
              {selectedTimeRange === '24h' && 'Last 24 hours of performance trends'}
              {selectedTimeRange === '7d' && 'Last 7 days of performance trends'}
              {selectedTimeRange === '30d' && 'Last 30 days of performance trends'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setSelectedTimeRange(range.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedTimeRange === range.id
                    ? 'bg-white dark:bg-gray-600 text-[#1E293B] dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#1E293B] dark:hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-500 ease-in ${chartsVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Response Time Trend */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-300 dark:border-gray-600">
            <h3 className="text-base font-medium text-[#1E293B] dark:text-white mb-4">Response Time (ms)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={responseTimeData} margin={{ top: 10, right: 10, left: 0, bottom: selectedTimeRange === '30d' ? 60 : 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="timestamp"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={formatXAxis}
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  scale="time"
                  angle={selectedTimeRange === '30d' ? -90 : 0}
                  textAnchor={selectedTimeRange === '30d' ? 'end' : 'middle'}
                  height={selectedTimeRange === '30d' ? 80 : 30}
                />
                <YAxis 
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  domain={[200, 300]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={270} 
                  stroke="#10B981" 
                  strokeDasharray="5 5" 
                  label={{ value: 'Baseline: 270ms', position: 'insideTopRight', fill: '#10B981', fontSize: 12 }}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', r: 3 }}
                  name="Response Time (ms)"
                  isAnimationActive={false}
                />
                {responseTimeRedSegments.map((segment, idx) => (
                  <Line
                    key={`red-segment-${idx}`}
                    type="linear"
                    dataKey="value"
                    data={segment.data}
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', r: 3 }}
                    isAnimationActive={false}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Error Rate Trend */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-300 dark:border-gray-600">
            <h3 className="text-base font-medium text-[#1E293B] dark:text-white mb-4">Error Rate (%)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={errorRateData} margin={{ top: 10, right: 10, left: 0, bottom: selectedTimeRange === '30d' ? 60 : 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="timestamp"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={formatXAxis}
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  scale="time"
                  angle={selectedTimeRange === '30d' ? -90 : 0}
                  textAnchor={selectedTimeRange === '30d' ? 'end' : 'middle'}
                  height={selectedTimeRange === '30d' ? 80 : 30}
                />
                <YAxis 
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  domain={[1.5, 2.8]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={2.0} 
                  stroke="#10B981" 
                  strokeDasharray="5 5" 
                  label={{ value: 'Baseline: 2.0%', position: 'insideTopRight', fill: '#10B981', fontSize: 12 }}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', r: 3 }}
                  name="Error Rate (%)"
                  isAnimationActive={false}
                />
                {errorRateRedSegments.map((segment, idx) => (
                  <Line
                    key={`red-segment-${idx}`}
                    type="linear"
                    dataKey="value"
                    data={segment.data}
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', r: 3 }}
                    isAnimationActive={false}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
