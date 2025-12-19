import { useEffect, useRef } from 'react';

interface AlertsPanelProps {
  onClose: () => void;
  onInvestigate?: (metricId: string) => void;
}

export default function AlertsPanel({ onClose, onInvestigate }: AlertsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const alerts = [
    {
      id: 1,
      severity: 'warning',
      title: 'CPU Utilization Elevated',
      description: 'CPU usage at 78% approaching capacity threshold of 85%',
      time: '15 minutes ago',
      affected: 'Application Server Cluster',
      metricId: 'cpu'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Database Connection Pool High',
      description: 'Active connections at 82% of pool capacity',
      time: '23 minutes ago',
      affected: 'Primary Database Instance',
      metricId: null
    }
  ];

  const handleInvestigate = (metricId: string | null) => {
    if (metricId && onInvestigate) {
      onClose();
      onInvestigate(metricId);
    }
  };

  return (
    <div ref={panelRef} className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-lg">
              <i className="ri-alert-line text-lg text-yellow-700"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1E293B]">Active Alerts</h2>
              <p className="text-sm text-gray-600">{alerts.length} alerts requiring attention</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="border-l-4 border-yellow-500 bg-yellow-50 rounded-lg p-4 transition-all hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500">
                      <i className="ri-alert-line text-sm text-white"></i>
                    </div>
                    <h3 className="text-base font-semibold text-[#1E293B]">{alert.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-white">
                      WARNING
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-time-line"></i>
                      <span>{alert.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="ri-server-line"></i>
                      <span>{alert.affected}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleInvestigate(alert.metricId)}
                  className="px-3 py-1.5 text-sm font-medium text-[#2563EB] hover:bg-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Investigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
