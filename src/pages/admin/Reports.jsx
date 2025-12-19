import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Reports = () => {
  const { isDark } = useTheme();
  const [reportType, setReportType] = useState('overview');

  const reports = [
    { id: 'overview', name: 'Platform Overview', icon: '📊', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'users', name: 'User Analytics', icon: '👥', color: 'green', gradient: 'from-green-500 to-emerald-500' },
    { id: 'exams', name: 'Exam Performance', icon: '📝', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
    { id: 'revenue', name: 'Revenue Report', icon: '💰', color: 'yellow', gradient: 'from-yellow-500 to-amber-500' },
    { id: 'usage', name: 'Usage Statistics', icon: '📈', color: 'red', gradient: 'from-red-500 to-orange-500' },
    { id: 'export', name: 'Data Export', icon: '📤', color: 'indigo', gradient: 'from-indigo-500 to-violet-500' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-6">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Analytics & Insights</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Platform
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              Reports & Analytics
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Generate insights and comprehensive reports from platform data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Types Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-dark-700' : 'bg-gray-100'
                }`}>
                  📋
                </div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Report Types</h3>
              </div>
              
              <div className="space-y-3">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setReportType(report.id)}
                    className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 group ${
                      reportType === report.id
                        ? isDark
                          ? `bg-gradient-to-r ${report.gradient} bg-opacity-20 border border-${report.color}-500/30`
                          : `bg-gradient-to-r ${report.gradient} bg-opacity-10 border border-${report.color}-400`
                        : `border ${
                            isDark 
                              ? 'border-dark-600 hover:border-dark-500 hover:bg-dark-700/50' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`
                    }`}
                  >
                    <div className={`text-2xl p-3 rounded-lg mr-4 transition-all duration-300 ${
                      reportType === report.id
                        ? isDark
                          ? `bg-gradient-to-r ${report.gradient} text-white`
                          : `bg-gradient-to-r ${report.gradient} text-white`
                        : isDark
                          ? 'bg-dark-700 text-gray-400 group-hover:text-gray-300'
                          : 'bg-gray-100 text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {report.icon}
                    </div>
                    <div className="text-left">
                      <div className={`font-semibold transition-colors duration-300 ${
                        reportType === report.id
                          ? isDark ? 'text-white' : 'text-gray-900'
                          : isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {report.name}
                      </div>
                      <div className={`text-xs mt-1 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Click to view report
                      </div>
                    </div>
                    
                    {reportType === report.id && (
                      <div className="ml-auto">
                        <div className={`w-2 h-2 rounded-full ${
                          isDark ? 'bg-white' : 'bg-gray-900'
                        }`}></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Export Options */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-dark-700' : 'bg-gray-100'
                  }`}>
                    📤
                  </div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Export Options</h4>
                </div>
                
                <div className="space-y-3">
                  {[
                    { icon: '📄', title: 'CSV Export', description: 'Export data as CSV files' },
                    { icon: '📃', title: 'PDF Report', description: 'Generate PDF reports' },
                    { icon: '🔗', title: 'API Access', description: 'Access data via API' },
                    { icon: '📊', title: 'Custom Report', description: 'Create custom reports' }
                  ].map((option, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 group ${
                        isDark
                          ? 'border border-dark-600 hover:border-dark-500 hover:bg-dark-700/50'
                          : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => console.log(`Export ${option.title}`)}
                    >
                      <div className={`text-xl p-3 rounded-lg mr-4 ${
                        isDark ? 'bg-dark-700 group-hover:bg-dark-600' : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        {option.icon}
                      </div>
                      <div className="text-left flex-1">
                        <div className={`font-medium ${
                          isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {option.title}
                        </div>
                        <div className={`text-xs ${
                          isDark ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {option.description}
                        </div>
                      </div>
                      <div className={`text-lg transition-transform duration-300 group-hover:translate-x-1 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        →
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`mt-6 rounded-2xl p-6 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <h4 className={`font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Quick Stats</h4>
              
              <div className="space-y-4">
                {[
                  { label: 'Reports Generated', value: '1,247', change: '+15%' },
                  { label: 'Data Points', value: '2.5M', change: '+22%' },
                  { label: 'Avg. Load Time', value: '0.8s', change: '-12%' },
                  { label: 'Export Success', value: '99.8%', change: '+0.2%' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stat.value}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        stat.change.includes('+')
                          ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                          : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl p-6 mb-6 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`text-2xl p-3 rounded-xl ${
                      isDark ? 'bg-dark-700' : 'bg-gray-100'
                    }`}>
                      {reports.find(r => r.id === reportType)?.icon}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {reports.find(r => r.id === reportType)?.name}
                      </h2>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Last updated: Today, 10:30 AM • Auto-refresh every 15 minutes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                  } shadow-lg hover:shadow-xl`}>
                    <span className="relative z-10 flex items-center gap-2">
                      <span>🔄</span>
                      <span>Refresh</span>
                    </span>
                  </button>
                  <button className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                  } shadow-lg hover:shadow-xl`}>
                    <span className="relative z-10 flex items-center gap-2">
                      <span>📥</span>
                      <span>Export Report</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Report Content based on type */}
              {reportType === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: '2,847', label: 'Total Users', color: 'blue', change: '+12.5%', icon: '👥' },
                      { value: '156', label: 'Active Exams', color: 'green', change: '+8.2%', icon: '📝' },
                      { value: '$24,580', label: 'Revenue', color: 'purple', change: '+23.1%', icon: '💰' },
                      { value: '78.5%', label: 'Avg. Score', color: 'yellow', change: '-2.3%', icon: '📊' }
                    ].map((stat, index) => (
                      <div key={index} className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDark 
                          ? 'bg-dark-800 border border-dark-700' 
                          : `bg-${stat.color}-50 border border-${stat.color}-200`
                      } shadow-lg`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`text-2xl font-bold ${
                              isDark 
                                ? stat.color === 'blue' ? 'text-blue-400' :
                                  stat.color === 'green' ? 'text-green-400' :
                                  stat.color === 'purple' ? 'text-purple-400' : 'text-yellow-400'
                                : stat.color === 'blue' ? 'text-blue-600' :
                                  stat.color === 'green' ? 'text-green-600' :
                                  stat.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'
                            }`}>
                              {stat.value}
                            </div>
                            <div className={`text-sm mt-1 ${
                              isDark ? 'text-gray-400' : `text-${stat.color}-700`
                            }`}>
                              {stat.label}
                            </div>
                          </div>
                          <div className={`text-2xl p-3 rounded-lg ${
                            isDark 
                              ? stat.color === 'blue' ? 'bg-blue-900/30' :
                                stat.color === 'green' ? 'bg-green-900/30' :
                                stat.color === 'purple' ? 'bg-purple-900/30' : 'bg-yellow-900/30'
                              : stat.color === 'blue' ? 'bg-blue-100' :
                                stat.color === 'green' ? 'bg-green-100' :
                                stat.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
                          }`}>
                            {stat.icon}
                          </div>
                        </div>
                        <div className={`mt-4 text-xs px-2 py-1 rounded-full inline-block ${
                          stat.change.includes('+')
                            ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                            : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                        }`}>
                          {stat.change} from last month
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>Platform Growth Trends</h4>
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>Last 6 months</span>
                    </div>
                    <div className={`h-64 rounded-xl flex items-center justify-center ${
                      isDark ? 'bg-dark-800 border border-dark-700' : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <div className="text-center">
                        <div className="text-4xl mb-4">📈</div>
                        <div className={`font-medium ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Interactive growth chart visualization
                        </div>
                        <div className={`text-sm mt-2 ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          Hover over data points for details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reportType === 'users' && (
                <div>
                  <h4 className={`font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>User Distribution & Analytics</h4>
                  <div className={`h-64 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-dark-800 border border-dark-700' : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className="text-4xl mb-4">👥</div>
                      <div className={`font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        User analytics dashboard
                      </div>
                      <div className={`text-sm mt-2 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Real-time user statistics and distribution
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Default content for other reports */}
              {!['overview', 'users'].includes(reportType) && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">
                    {reports.find(r => r.id === reportType)?.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {reports.find(r => r.id === reportType)?.name}
                  </h3>
                  <p className={`text-lg max-w-md mx-auto ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Detailed analytics and insights for {reportType.replace('-', ' ')} are being generated.
                  </p>
                  <div className="mt-6">
                    <button className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isDark
                        ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                    }`}>
                      <span className="relative z-10">Generate Report</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Report Filters */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-dark-700' : 'bg-gray-100'
                  }`}>
                    ⚙️
                  </div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Customize Report</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      label: 'Date Range',
                      options: ['Last 7 days', 'Last 30 days', 'Last quarter', 'Last year', 'Custom range'],
                      icon: '📅'
                    },
                    {
                      label: 'Group By',
                      options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'],
                      icon: '📊'
                    },
                    {
                      label: 'Metric Type',
                      options: ['Count', 'Percentage', 'Average', 'Sum', 'Growth Rate'],
                      icon: '📈'
                    }
                  ].map((filter, index) => (
                    <div key={index}>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span>{filter.icon}</span>
                          <span>{filter.label}</span>
                        </div>
                      </label>
                      <select className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-dark-700 border border-dark-600 text-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                          : 'bg-white border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500'
                      }`}>
                        {filter.options.map((option, i) => (
                          <option key={i}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                
                {/* Advanced Filters */}
                <div className="mt-6">
                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    isDark
                      ? 'border border-dark-600 hover:border-dark-500 hover:bg-dark-700/50'
                      : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`text-xl p-2 rounded-lg ${
                        isDark ? 'bg-dark-700' : 'bg-gray-100'
                      }`}>
                        🔍
                      </div>
                      <div className="text-left">
                        <div className={`font-medium ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Advanced Filters
                        </div>
                        <div className={`text-xs ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          Add custom filters and segmentation
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      +
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Report History */}
            <div className={`rounded-2xl p-6 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <h4 className={`font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Recent Reports</h4>
              
              <div className="space-y-3">
                {[
                  { name: 'Monthly Performance', date: 'Today, 9:45 AM', type: 'overview', size: '2.4 MB' },
                  { name: 'User Activity Analysis', date: 'Yesterday, 3:20 PM', type: 'users', size: '1.8 MB' },
                  { name: 'Revenue Q4 Report', date: 'Dec 15, 2024', type: 'revenue', size: '3.2 MB' },
                  { name: 'Exam Success Rates', date: 'Dec 10, 2024', type: 'exams', size: '2.1 MB' }
                ].map((report, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${
                    isDark ? 'bg-dark-700/30 hover:bg-dark-700/50' : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors duration-300`}>
                    <div className="flex items-center gap-3">
                      <div className={`text-xl p-3 rounded-lg ${
                        isDark ? 'bg-dark-700' : 'bg-gray-100'
                      }`}>
                        {reports.find(r => r.id === report.type)?.icon}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {report.name}
                        </div>
                        <div className={`text-sm ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {report.date} • {report.size}
                        </div>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isDark
                        ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                    }`}>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;