import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const AnalyticsChart = ({ type = 'usage' }) => {
  const usageData = [
    { month: 'Jan', users: 1200, exams: 450 },
    { month: 'Feb', users: 1800, exams: 620 },
    { month: 'Mar', users: 2400, exams: 890 },
    { month: 'Apr', users: 2800, exams: 1050 },
    { month: 'May', users: 3200, exams: 1280 },
    { month: 'Jun', users: 3800, exams: 1520 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 }, 
    { month: 'Feb', revenue: 18200 },
    { month: 'Mar', revenue: 21500 },
    { month: 'Apr', revenue: 24800 },
    { month: 'May', revenue: 29200 },
    { month: 'Jun', revenue: 32500 }
  ];

  const data = type === 'usage' ? usageData : revenueData;
  const maxValue = type === 'usage' 
    ? Math.max(...data.map(d => Math.max(d.users, d.exams)))
    : Math.max(...data.map(d => d.revenue));
  
  const { isDark } = useTheme();

  return (
    <div className={`rounded-2xl p-6 transition-all duration-500 ${
      isDark 
        ? 'bg-dark-800/50 border border-dark-700 text-gray-100' 
        : 'bg-white border border-gray-200 text-gray-900'
    } shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {type === 'usage' ? 'Platform Usage' : 'Revenue Analytics'}
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {type === 'usage' ? 'User activity and exam statistics' : 'Monthly revenue performance'}
          </p>
        </div>
        
        <select className={`text-sm rounded-xl px-4 py-2 font-medium transition-all duration-300 ${
          isDark
            ? 'bg-dark-700 border border-dark-600 text-gray-300 hover:bg-dark-600'
            : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-primary-500`}>
          <option>Last 6 Months</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>

      {/* Legend */}
      <div className="flex space-x-6 mb-6">
        {type === 'usage' && (
          <>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 mr-2"></div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-secondary-500 to-purple-500 mr-2"></div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Exams Taken</span>
            </div>
          </>
        )}
        {type === 'revenue' && (
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-2"></div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Revenue ($)</span>
          </div>
        )}
      </div>

      {/* Chart Visualization */}
      <div className="relative h-64 mb-8">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 25, 50, 75, 100].map((percent, index) => (
            <div 
              key={index}
              className={`h-px w-full ${
                isDark ? 'bg-dark-600' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>

        {/* Chart Bars */}
        <div className="absolute inset-0 flex items-end px-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center px-2">
              {type === 'usage' ? (
                <div className="flex items-end space-x-1 w-full justify-center h-48">
                  {/* Users Bar */}
                  <div className="relative group">
                    <div 
                      className="w-6 rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 transition-all duration-300 cursor-pointer"
                      style={{ height: `${(item.users / maxValue) * 100}%` }}
                    ></div>
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDark ? 'bg-dark-700 text-gray-300' : 'bg-gray-800 text-white'
                    }`}>
                      {item.users.toLocaleString()} users
                    </div>
                  </div>
                  
                  {/* Exams Bar */}
                  <div className="relative group">
                    <div 
                      className="w-6 rounded-t-lg bg-gradient-to-t from-secondary-600 to-secondary-400 hover:from-secondary-500 hover:to-secondary-300 transition-all duration-300 cursor-pointer"
                      style={{ height: `${(item.exams / maxValue) * 100}%` }}
                    ></div>
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDark ? 'bg-dark-700 text-gray-300' : 'bg-gray-800 text-white'
                    }`}>
                      {item.exams.toLocaleString()} exams
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group w-full flex justify-center h-48">
                  <div 
                    className="w-8 rounded-t-lg bg-gradient-to-t from-green-600 to-emerald-400 hover:from-green-500 hover:to-emerald-300 transition-all duration-300 cursor-pointer"
                    style={{ height: `${(item.revenue / maxValue) * 100}%` }}
                  ></div>
                  <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark ? 'bg-dark-700 text-gray-300' : 'bg-gray-800 text-white'
                  }`}>
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>
              )}
              
              {/* Month Label */}
              <div className={`text-xs font-medium mt-3 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-dark-700">
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {type === 'usage' ? '3,800' : '$32,500'}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Current Month
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500 mb-1">
            {type === 'usage' ? '+42%' : '+38%'}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Growth Rate
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {type === 'usage' ? '15,200' : '$138,700'}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Total ({type === 'usage' ? 'Users' : 'Revenue'})
          </div>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className={`mt-6 px-4 py-3 rounded-xl flex items-center justify-between ${
        isDark ? 'bg-dark-700/50' : 'bg-gray-100'
      }`}>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            type === 'usage' 
              ? 'bg-primary-500/20 text-primary-500' 
              : 'bg-green-500/20 text-green-500'
          }`}>
            {type === 'usage' ? '📈' : '💰'}
          </div>
          <div>
            <div className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {type === 'usage' ? 'Strong growth trend' : 'Revenue increasing steadily'}
            </div>
            <div className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Compared to previous period
            </div>
          </div>
        </div>
        
        <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
          isDark
            ? 'bg-dark-600 hover:bg-dark-500 text-gray-300'
            : 'bg-white hover:bg-gray-200 text-gray-700 border border-gray-300'
        }`}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default AnalyticsChart;