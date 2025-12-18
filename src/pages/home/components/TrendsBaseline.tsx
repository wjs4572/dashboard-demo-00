import { useState, useEffect } from 'react';

export default function TrendsBaseline() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const timeRanges = [
    { id: '1h', label: '1H' },
    { id: '6h', label: '6H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' }
  ];

  // Generate clock time labels aligned to 10-minute boundaries
  const generateTimeLabels = () => {
    const now = new Date(currentTime);
    const currentMinutes = now.getMinutes();
    const currentHours = now.getHours();
    
    // Round down to nearest 10-minute boundary
    const alignedMinutes = Math.floor(currentMinutes / 10) * 10;
    const endTime = new Date(now);
    endTime.setMinutes(alignedMinutes, 0, 0);
    
    const labels = [];
    // Generate 7 labels (every 10 minutes for 1 hour)
    for (let i = 6; i >= 0; i--) {
      const time = new Date(endTime.getTime() - i * 10 * 60000);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      labels.push(formattedTime);
    }
    return labels;
  };

  // Generate response time data points
  const generateResponseTimeData = () => {
    const now = new Date(currentTime);
    const alignedMinutes = Math.floor(now.getMinutes() / 10) * 10;
    const endTime = new Date(now);
    endTime.setMinutes(alignedMinutes, 0, 0);
    
    const data = [];
    const baseline = 270;
    const targetAverage = baseline * (1 - 0.083); // 8.3% below baseline = 247.39ms
    
    // Generate 13 points (every 5 minutes for 1 hour)
    for (let i = 12; i >= 0; i--) {
      const time = new Date(endTime.getTime() - i * 5 * 60000);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      let value;
      // Check if this is the 11:32 time slot (or close to it)
      if (timeString === '11:30' || timeString === '11:35') {
        // Point above baseline at 11:32 area
        value = 285;
      } else {
        // Random values between 0-250, biased toward target average
        const random = Math.random();
        if (random < 0.3) {
          value = Math.floor(Math.random() * 100) + 150; // 150-250
        } else if (random < 0.7) {
          value = Math.floor(Math.random() * 80) + 200; // 200-280 (around target)
        } else {
          value = Math.floor(Math.random() * 150) + 50; // 50-200
        }
      }
      
      data.push({
        time: i, // index from 0 to 12
        value: value,
        timeString: timeString
      });
    }
    
    return data;
  };

  const responseTimeData = generateResponseTimeData();
  const errorRateData: { time: number; value: number }[] = [];

  const responseTimeBaseline = 270;
  const errorRateBaseline = 2.0;

  // Calculate Y position for a value
  const getYPosition = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min);
    return (1 - normalized) * 100;
  };

  // Calculate X position for a time index (0-12)
  const getXPosition = (timeIndex: number) => {
    return (timeIndex / 12) * 100;
  };

  // Generate SVG path for the line
  const generatePath = (data: typeof responseTimeData) => {
    if (data.length === 0) return '';
    
    const points = data.map(d => {
      const x = getXPosition(d.time);
      const y = getYPosition(d.value, 0, 500);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-1">Trends and Baseline Comparison</h2>
            <p className="text-sm text-gray-600">Rolling 1-hour window showing recent performance patterns</p>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setSelectedTimeRange(range.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedTimeRange === range.id
                    ? 'bg-white text-[#1E293B] shadow-sm'
                    : 'text-gray-600 hover:text-[#1E293B]'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Time Trend */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-base font-medium text-[#1E293B] mb-4">Response Time (ms)</h3>
            <div className="relative">
              <img 
                src="https://static.readdy.ai/image/9e99d7141ea7221ac1fbc067090ea47d/54ef5dc6e63e64eb4377b061d12504f0.png" 
                alt="Response Time Trend Chart"
                className="w-full h-auto rounded border border-gray-200"
                style={{ minHeight: '280px' }}
              />
            </div>
          </div>
          
          {/* Error Rate Trend */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-base font-medium text-[#1E293B] mb-4">Error Rate (%)</h3>
            <div className="relative">
              <img 
                src="https://static.readdy.ai/image/9e99d7141ea7221ac1fbc067090ea47d/2bdeb44e1896038b48783ff37145519d.png" 
                alt="Error Rate Trend Chart"
                className="w-full h-auto rounded border border-gray-200"
                style={{ minHeight: '280px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
