import { useNavigate } from 'react-router-dom';

interface AlertsExceptionsProps {
  showErrors?: boolean;
}

export default function AlertsExceptions({ showErrors = false }: AlertsExceptionsProps) {
  const navigate = useNavigate();
  const alerts = [
    {
      id: 2,
      severity: 'warning',
      title: 'CPU Utilization Elevated',
      description: 'CPU usage at 78% approaching capacity threshold of 85%',
      time: '15 minutes ago',
      affected: 'Application Server Cluster',
      metric: 'cpu-usage'
    },
    {
      id: 3,
      severity: 'warning',
      title: 'Database Connection Pool High',
      description: 'Active connections at 82% of pool capacity',
      time: '23 minutes ago',
      affected: 'Primary Database Instance',
      metric: 'throughput'
    }
  ];

  const errors = [
    {
      id: 1,
      severity: 'critical',
      title: 'API Gateway Timeout',
      description: 'Multiple requests timing out after 30 seconds on /api/v2/users endpoint',
      time: '5 minutes ago',
      affected: 'API Gateway - US East',
      metric: null
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Database Connection Failed',
      description: 'Unable to establish connection to primary database instance',
      time: '12 minutes ago',
      affected: 'Primary Database Cluster',
      metric: null
    },
    {
      id: 3,
      severity: 'warning',
      title: 'Memory Leak Detected',
      description: 'Gradual memory increase detected in worker process #3',
      time: '28 minutes ago',
      affected: 'Worker Node Pool',
      metric: null
    }
  ];

  const displayItems = showErrors ? errors : alerts;
  const title = showErrors ? 'Errors & Exceptions' : 'Alerts & Exceptions';
  const subtitle = showErrors ? 'Critical errors requiring immediate attention' : 'Active alerts requiring attention';

  const handleInvestigate = (metric: string | null) => {
    if (metric) {
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // After scroll completes, open drill-down panel
      setTimeout(() => {
        const drillDownEvent = new CustomEvent('openDrillDown', { detail: { metric } });
        window.dispatchEvent(drillDownEvent);
      }, 500);
    }
  };

  const handleViewAll = () => {
    if (showErrors) {
      navigate('/errors');
    } else {
      navigate('/alerts');
    }
  };

  return (
    <section className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-1">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
          <button 
            onClick={handleViewAll}
            className="px-4 py-2 text-sm font-medium text-[#2563EB] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {showErrors ? 'View All Errors' : 'View All Alerts'}
          </button>
        </div>
        
        <div className="space-y-3">
          {displayItems.map((item) => (
            <div 
              key={item.id}
              className={`border-l-4 rounded-lg p-4 transition-all hover:shadow-md cursor-pointer ${
                item.severity === 'critical' 
                  ? 'border-[#CC2936] dark:border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      item.severity === 'critical' ? 'bg-[#CC2936] dark:bg-red-500' : 'bg-yellow-500'
                    }`}>
                      <i className={`${
                        item.severity === 'critical' ? 'ri-error-warning-line' : 'ri-alert-line'
                      } text-sm text-white`}></i>
                    </div>
                    <h3 className="text-base font-semibold text-[#1E293B] dark:text-white">{item.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.severity === 'critical' 
                        ? 'bg-[#CC2936] dark:bg-red-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {item.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-time-line"></i>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                      <i className="ri-server-line"></i>
                      <span>{item.affected}</span>
                    </div>
                  </div>
                </div>
                {item.metric && (
                  <button 
                    onClick={() => handleInvestigate(item.metric)}
                    className="px-3 py-1.5 text-sm font-medium text-[#2563EB] dark:text-blue-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Investigate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}