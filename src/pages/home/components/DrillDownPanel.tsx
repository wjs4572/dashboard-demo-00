import { useState, useEffect } from 'react';

interface DrillDownPanelProps {
  metricId: string;
  onClose: () => void;
}

export default function DrillDownPanel({ metricId, onClose }: DrillDownPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation after mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Trigger slide-out animation before closing
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 1000); // Match animation duration
  };

  const metricDetails: Record<string, any> = {
    'response-time': {
      title: 'Response Time Breakdown',
      description: 'Detailed analysis of response time components and contributing factors',
      components: [
        { name: 'Database Query', value: '142ms', percentage: 57, status: 'normal' },
        { name: 'API Processing', value: '68ms', percentage: 28, status: 'normal' },
        { name: 'Network Latency', value: '25ms', percentage: 10, status: 'normal' },
        { name: 'Cache Lookup', value: '12ms', percentage: 5, status: 'normal' }
      ],
      insights: [
        'Database queries performing within expected range',
        'No significant network latency detected',
        'Cache hit rate at 94.2%, above baseline'
      ]
    },
    'throughput': {
      title: 'Throughput Analysis',
      description: 'Request volume breakdown by endpoint and source',
      components: [
        { name: '/api/users', value: '4.2K/min', percentage: 34, status: 'normal' },
        { name: '/api/products', value: '3.8K/min', percentage: 31, status: 'normal' },
        { name: '/api/orders', value: '2.6K/min', percentage: 21, status: 'normal' },
        { name: '/api/analytics', value: '1.8K/min', percentage: 14, status: 'normal' }
      ],
      insights: [
        'User endpoint traffic increased 18% from baseline',
        'Product queries showing healthy distribution',
        'No bottlenecks detected in request processing'
      ]
    },
    'error-rate': {
      title: 'Error Rate Breakdown',
      description: 'Error distribution by type and affected endpoints',
      components: [
        { name: '500 Internal Server', value: '1.2%', percentage: 43, status: 'critical' },
        { name: '503 Service Unavailable', value: '0.8%', percentage: 29, status: 'warning' },
        { name: '429 Rate Limited', value: '0.5%', percentage: 18, status: 'warning' },
        { name: '400 Bad Request', value: '0.3%', percentage: 10, status: 'normal' }
      ],
      insights: [
        'Internal server errors spiked 65% in last 2 hours',
        'Payment service experiencing intermittent failures',
        'Database connection pool nearing capacity limits'
      ]
    },
    'cpu-usage': {
      title: 'CPU Utilization Details',
      description: 'CPU usage breakdown by process and service',
      components: [
        { name: 'Application Server', value: '42%', percentage: 54, status: 'warning' },
        { name: 'Background Jobs', value: '18%', percentage: 23, status: 'normal' },
        { name: 'Cache Service', value: '12%', percentage: 15, status: 'normal' },
        { name: 'System Processes', value: '6%', percentage: 8, status: 'normal' }
      ],
      insights: [
        'Application server load increased due to traffic spike',
        'Background job processing within normal parameters',
        'Consider scaling if load persists above 75%'
      ]
    }
  };

  const details = metricDetails[metricId];

  if (!details) {
    return null;
  }

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl border-2 border-[#2563EB] dark:border-blue-500 shadow-lg p-6 transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-1">{details.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{details.description}</p>
        </div>
        <button 
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-xl text-gray-600 dark:text-gray-300"></i>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-base font-medium text-[#1E293B] dark:text-white mb-4">Component Breakdown</h3>
          <div className="space-y-3">
            {details.components.map((component: any, index: number) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1E293B] dark:text-white">{component.name}</span>
                  <span className="text-sm font-semibold text-[#1E293B] dark:text-white">{component.value}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        component.status === 'critical' ? 'bg-[#CC2936] dark:bg-red-500' :
                        component.status === 'warning' ? 'bg-yellow-500' :
                        'bg-[#085665] dark:bg-teal-500'
                      }`}
                      style={{ width: `${component.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">{component.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium text-[#1E293B] dark:text-white mb-4">Key Insights</h3>
          <div className="space-y-3">
            {details.insights.map((insight: string, index: number) => (
              <div key={index} className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-base text-[#2563EB] dark:text-blue-400"></i>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
