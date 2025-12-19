export default function ContextFactors() {
  const factors = [
    {
      category: 'System Health',
      items: [
        { label: 'Memory Usage', value: '64%', status: 'normal' },
        { label: 'Disk I/O', value: '42%', status: 'normal' },
        { label: 'Network Bandwidth', value: '58%', status: 'normal' }
      ]
    },
    {
      category: 'Service Status',
      items: [
        { label: 'Database Cluster', value: 'Healthy', status: 'normal' },
        { label: 'Cache Layer', value: 'Healthy', status: 'normal' },
        { label: 'Load Balancer', value: 'Healthy', status: 'normal' }
      ]
    },
    {
      category: 'Traffic Patterns',
      items: [
        { label: 'Active Users', value: '8,247', status: 'normal' },
        { label: 'Peak Concurrent', value: '12,450', status: 'normal' },
        { label: 'Geographic Distribution', value: 'Normal', status: 'normal' }
      ]
    },
    {
      category: 'Recent Changes',
      items: [
        { label: 'Last Deployment', value: '2h ago', status: 'normal' },
        { label: 'Config Changes', value: 'None', status: 'normal' },
        { label: 'Infrastructure', value: 'Stable', status: 'normal' }
      ]
    }
  ];

  return (
    <section className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-1">Context and Supporting Factors</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Additional system context and environmental factors</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((factor, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
              <h3 className="text-sm font-semibold text-[#1E293B] dark:text-white mb-4">{factor.category}</h3>
              <div className="space-y-3">
                {factor.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1E293B] dark:text-white">{item.value}</span>
                      <div className="w-2 h-2 rounded-full bg-[#085665] dark:bg-teal-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
