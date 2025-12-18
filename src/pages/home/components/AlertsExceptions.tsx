
export default function AlertsExceptions() {
  const alerts = [
    {
      id: 2,
      severity: 'warning',
      title: 'CPU Utilization Elevated',
      description: 'CPU usage at 78% approaching capacity threshold of 85%',
      time: '15 minutes ago',
      affected: 'Application Server Cluster'
    },
    {
      id: 3,
      severity: 'warning',
      title: 'Database Connection Pool High',
      description: 'Active connections at 82% of pool capacity',
      time: '23 minutes ago',
      affected: 'Primary Database Instance'
    }
  ];

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#1E293B] mb-1">Alerts &amp; Exceptions</h2>
            <p className="text-sm text-gray-600">Active alerts requiring attention</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
            View All Alerts
          </button>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`border-l-4 rounded-lg p-4 transition-all hover:shadow-md cursor-pointer ${
                alert.severity === 'critical' 
                  ? 'border-[#CC2936] bg-red-50' 
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      alert.severity === 'critical' ? 'bg-[#CC2936]' : 'bg-yellow-500'
                    }`}>
                      <i className={`${
                        alert.severity === 'critical' ? 'ri-error-warning-line' : 'ri-alert-line'
                      } text-sm text-white`}></i>
                    </div>
                    <h3 className="text-base font-semibold text-[#1E293B]">{alert.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.severity === 'critical' 
                        ? 'bg-[#CC2936] text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-time-line"></i>
                      <span>{alert.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <i className="ri-server-line"></i>
                      <span>{alert.affected}</span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-sm font-medium text-[#2563EB] hover:bg-white rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  Investigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
