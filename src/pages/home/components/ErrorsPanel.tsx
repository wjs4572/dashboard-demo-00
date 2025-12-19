interface ErrorsPanelProps {
  onClose: () => void;
}

export default function ErrorsPanel({ onClose }: ErrorsPanelProps) {
  const errors = [
    {
      id: 1,
      severity: 'critical',
      title: 'API Gateway Timeout',
      description: 'Multiple requests timing out after 30 seconds on /api/v2/users endpoint',
      time: '5 minutes ago',
      affected: 'API Gateway - Production',
      count: 47
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Database Connection Failed',
      description: 'Unable to establish connection to primary database instance',
      time: '8 minutes ago',
      affected: 'Primary Database Cluster',
      count: 23
    },
    {
      id: 3,
      severity: 'critical',
      title: 'Memory Leak Detected',
      description: 'Application memory usage increasing continuously, currently at 92%',
      time: '12 minutes ago',
      affected: 'Web Application Server 3',
      count: 15
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
              <i className="ri-error-warning-line text-lg text-red-700"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1E293B]">Active Errors</h2>
              <p className="text-sm text-gray-600">{errors.length} critical errors detected</p>
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
          {errors.map((error) => (
            <div 
              key={error.id}
              className="border-l-4 border-[#CC2936] bg-red-50 rounded-lg p-4 transition-all hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#CC2936]">
                      <i className="ri-error-warning-line text-sm text-white"></i>
                    </div>
                    <h3 className="text-base font-semibold text-[#1E293B]">{error.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#CC2936] text-white">
                      CRITICAL
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                      {error.count} occurrences
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{error.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-time-line"></i>
                      <span>{error.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="ri-server-line"></i>
                      <span>{error.affected}</span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-sm font-medium text-[#2563EB] hover:bg-white rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  Debug
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
