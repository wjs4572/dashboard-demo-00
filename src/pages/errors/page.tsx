import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Error {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  affected: string;
  count: number;
  status: 'active' | 'investigating' | 'resolved';
  assignee?: string;
}

export default function ErrorsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const errors: Error[] = [
    {
      id: 1,
      severity: 'critical',
      title: 'API Gateway Timeout',
      description: 'Multiple requests timing out after 30 seconds on /api/v2/users endpoint',
      time: '5 minutes ago',
      affected: 'API Gateway - Production',
      count: 47,
      status: 'active',
      assignee: 'John Smith'
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Database Connection Failed',
      description: 'Unable to establish connection to primary database instance',
      time: '8 minutes ago',
      affected: 'Primary Database Cluster',
      count: 23,
      status: 'investigating',
      assignee: 'Sarah Johnson'
    },
    {
      id: 3,
      severity: 'critical',
      title: 'Memory Leak Detected',
      description: 'Application memory usage increasing continuously, currently at 92%',
      time: '12 minutes ago',
      affected: 'Web Application Server 3',
      count: 15,
      status: 'active'
    },
    {
      id: 4,
      severity: 'warning',
      title: 'Slow Query Performance',
      description: 'Database queries taking longer than 5 seconds on average',
      time: '25 minutes ago',
      affected: 'Database Query Engine',
      count: 89,
      status: 'investigating',
      assignee: 'Mike Chen'
    },
    {
      id: 5,
      severity: 'critical',
      title: 'Service Unavailable',
      description: 'Payment processing service returning 503 errors',
      time: '32 minutes ago',
      affected: 'Payment Gateway Service',
      count: 156,
      status: 'active',
      assignee: 'Emily Davis'
    },
    {
      id: 6,
      severity: 'warning',
      title: 'High Error Rate',
      description: 'Error rate increased to 8.5% from baseline of 2%',
      time: '45 minutes ago',
      affected: 'API Gateway - EU West',
      count: 234,
      status: 'resolved',
      assignee: 'Tom Wilson'
    },
    {
      id: 7,
      severity: 'critical',
      title: 'Disk Space Critical',
      description: 'Available disk space below 5% on primary storage volume',
      time: '1 hour ago',
      affected: 'Storage Server 1',
      count: 3,
      status: 'investigating',
      assignee: 'Lisa Anderson'
    },
    {
      id: 8,
      severity: 'info',
      title: 'SSL Certificate Expiring',
      description: 'SSL certificate will expire in 7 days',
      time: '2 hours ago',
      affected: 'Web Server Cluster',
      count: 1,
      status: 'active'
    },
    {
      id: 9,
      severity: 'warning',
      title: 'Cache Miss Rate High',
      description: 'Cache miss rate at 45%, significantly above normal 15%',
      time: '3 hours ago',
      affected: 'Redis Cache Cluster',
      count: 567,
      status: 'resolved',
      assignee: 'David Brown'
    },
    {
      id: 10,
      severity: 'critical',
      title: 'Authentication Service Down',
      description: 'Users unable to login, authentication service not responding',
      time: '4 hours ago',
      affected: 'Auth Service - Global',
      count: 892,
      status: 'resolved',
      assignee: 'Rachel Green'
    }
  ];

  const filteredErrors = errors.filter(error => {
    const matchesSearch = error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.affected.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || error.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || error.status === statusFilter;
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
                <h1 className="text-xl font-semibold text-[#1E293B] dark:text-white">All Errors</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{filteredErrors.length} errors found</p>
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
                  placeholder="Search errors..."
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
                    Error
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
                {filteredErrors.map((error) => (
                  <tr key={error.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(error.severity)}`}>
                        {error.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <div className="text-sm font-semibold text-[#1E293B] dark:text-white mb-1">{error.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{error.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <i className="ri-server-line text-gray-400 dark:text-gray-500"></i>
                        <span>{error.affected}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{error.count}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(error.status)}`}>
                        {error.status.charAt(0).toUpperCase() + error.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {error.assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium">
                            {error.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{error.assignee}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <i className="ri-time-line"></i>
                        <span>{error.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
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
          
          {filteredErrors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                <i className="ri-error-warning-line text-3xl text-gray-400 dark:text-gray-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No errors found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
