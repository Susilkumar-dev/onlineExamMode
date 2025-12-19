import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('overview');

  const reports = [
    { id: 'overview', name: 'Platform Overview', icon: '📊' },
    { id: 'users', name: 'User Analytics', icon: '👥' },
    { id: 'exams', name: 'Exam Performance', icon: '📝' },
    { id: 'revenue', name: 'Revenue Report', icon: '💰' },
    { id: 'usage', name: 'Usage Statistics', icon: '📈' },
    { id: 'export', name: 'Data Export', icon: '📤' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Generate insights and reports from platform data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Types */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Types</h3>
            <div className="space-y-3">
              {reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setReportType(report.id)}
                  className={`w-full flex items-center p-4 rounded-lg transition-colors ${
                    reportType === report.id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-2xl mr-4">{report.icon}</span>
                  <span className="font-medium text-gray-900">{report.name}</span>
                </button>
              ))}
            </div>

            {/* Export Options */}
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-4">Export Options</h4>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                  <div className="font-medium text-gray-900">CSV Export</div>
                  <div className="text-sm text-gray-500">Export data as CSV files</div>
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                  <div className="font-medium text-gray-900">PDF Report</div>
                  <div className="text-sm text-gray-500">Generate PDF reports</div>
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                  <div className="font-medium text-gray-900">API Access</div>
                  <div className="text-sm text-gray-500">Access data via API</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {reports.find(r => r.id === reportType)?.name}
                </h2>
                <p className="text-gray-600">Last updated: Today, 10:30 AM</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Refresh
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Export
                </button>
              </div>
            </div>

            {/* Report Content based on type */}
            {reportType === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2,847</div>
                    <div className="text-sm text-blue-700">Total Users</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-green-700">Active Exams</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$24,580</div>
                    <div className="text-sm text-purple-700">Revenue</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">78.5%</div>
                    <div className="text-sm text-yellow-700">Avg. Score</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Platform Growth</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Growth chart visualization</div>
                  </div>
                </div>
              </div>
            )}

            {reportType === 'users' && (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">User Distribution</h4>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">User analytics chart</div>
                </div>
              </div>
            )}

            {/* Default content for other reports */}
            {!['overview', 'users'].includes(reportType) && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {reports.find(r => r.id === reportType)?.name}
                </h3>
                <p className="text-gray-600">Select a report type to view detailed analytics</p>
              </div>
            )}

            {/* Report Filters */}
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-4">Customize Report</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last quarter</option>
                    <option>Custom range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group By
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metric
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Count</option>
                    <option>Percentage</option>
                    <option>Average</option>
                    <option>Sum</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;