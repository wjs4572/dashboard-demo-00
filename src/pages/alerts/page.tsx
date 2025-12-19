import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Alert {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  affected: string;
  count: number;
  status: 'active' | 'investigating' | 'resolved';
  assignee?: string;
  metric?: string;
}

export default function AlertsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const alerts: Alert[] = [
    {
      id: 1,
      severity: 'warning',
      title: 'CPU Utilization Elevated',
      description: 'CPU usage at 78% approaching capacity threshold of 85%',
      time: '15 minutes ago',
      affected: 'Application Server Cluster',
      count: 12,
      status: 'active',
      assignee: 'Alex Martinez',
      metric: 'cpu-usage'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Database Connection Pool High',
      description: 'Active connections at 82% of pool capacity',
      time: '23 minutes ago',
      affected: 'Primary Database Instance',
      count: 8,
      status: 'investigating',
      assignee: 'Jordan Lee',
      metric: 'throughput'
    },
    {
      id: 3,
      severity: 'warning',
      title: 'Response Time Degradation',
      description: 'Average response time increased to 850ms from baseline of 450ms',
      time: '35 minutes ago',
      affected: 'API Gateway - US West',
      count: 45,
      status: 'active',
      assignee: 'Sam Wilson'
    },
    {
      id: 4,
      severity: 'info',
      title: 'Scheduled Maintenance Upcoming',
      description: 'Database maintenance scheduled for tonight at 2:00 AM EST',
      time: '1 hour ago',
      affected: 'Database Cluster',
      count: 1,
      status: 'active'
    },
    {
      id: 5,
      severity: 'warning',
      title: 'Network Latency Spike',
      description: 'Network latency increased to 120ms from normal 45ms',
      time: '1 hour ago',
      affected: 'Load Balancer - EU Central',
      count: 67,
      status: 'investigating',
      assignee: 'Emma Thompson'
    },
    {
      id: 6,
      severity: 'warning',
      title: 'Storage Capacity Warning',
      description: 'Storage utilization at 75%, approaching 85% threshold',
      time: '2 hours ago',
      affected: 'Storage Volume 2',
      count: 3,
      status: 'active',
      assignee: 'Chris Anderson'
    },
    {
      id: 7,
      severity: 'info',
      title: 'API Rate Limit Approaching',
      description: 'API calls at 70% of rate limit for current hour',
      time: '2 hours ago',
      affected: 'API Gateway - Global',
      count: 234,
      status: 'resolved',
      assignee: 'Taylor Brown'
    },
    {
      id: 8,
      severity: 'warning',
      title: 'Memory Usage High',
      description: 'Memory utilization at 88% on worker nodes',
      time: '3 hours ago',
      affected: 'Worker Node Pool',
      count: 15,
      status: 'investigating',
      assignee: 'Morgan Davis'
    },
    {
      id: 9,
      severity: 'warning',
      title: 'Queue Depth Increasing',
      description: 'Message queue depth at 5,000 messages, normal is 1,200',
      time: '3 hours ago',
      affected: 'Message Queue Service',
      count: 89,
      status: 'active',
      assignee: 'Riley Johnson'
    },
    {
      id: 10,
      severity: 'info',
      title: 'Backup Completed Successfully',
      description: 'Daily backup completed with no errors',
      time: '4 hours ago',
      affected: 'Backup Service',
      count: 1,
      status: 'resolved',
      assignee: 'Casey Miller'
    },
    {
      id: 11,
      severity: 'warning',
      title: 'Load Balancer Health Check Failures',
      description: 'Intermittent health check failures on 2 backend servers',
      time: '5 hours ago',
      affected: 'Load Balancer - Asia Pacific',
      count: 23,
      status: 'resolved',
      assignee: 'Jamie White'
    },
    {
      id: 12,
      severity: 'warning',
      title: 'CDN Cache Hit Rate Low',
      description: 'Cache hit rate dropped to 65% from normal 85%',
      time: '6 hours ago',
      affected: 'CDN Network',
      count: 156,
      status: 'resolved',
      assignee: 'Drew Garcia'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.affected.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#CC2936] text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInvestigate = (metric: string | undefined) => {
    if (metric) {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          const drillDownEvent = new CustomEvent('openDrillDown', { detail: { metric } });
          window.dispatchEvent(drillDownEvent);
        }, 500);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-['Inter',sans-serif] transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-xl text-gray-700 dark:text-gray-300"></i>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B] dark:text-white">All Alerts</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{filteredAlerts.length} alerts found</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400 dark:text-gray-500"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search alerts..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Severity</label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Alert
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Affected System
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <div className="text-sm font-semibold text-[#1E293B] dark:text-white mb-1">{alert.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{alert.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <i className="ri-server-line text-gray-400 dark:text-gray-500"></i>
                        <span>{alert.affected}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{alert.count}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {alert.assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium">
                            {alert.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{alert.assignee}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <i className="ri-time-line"></i>
                        <span>{alert.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {alert.metric && (
                          <button 
                            onClick={() => handleInvestigate(alert.metric)}
                            className="px-3 py-1.5 text-xs font-medium text-[#2563EB] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Investigate
                          </button>
                        )}
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors cursor-pointer group">
                          <i className="ri-eye-line text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors cursor-pointer group">
                          <i className="ri-edit-line text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                <i className="ri-alert-line text-3xl text-gray-400 dark:text-gray-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No alerts found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
