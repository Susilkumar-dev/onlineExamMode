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
    <div className={`your-classes ${isDark ? 'dark-classes' : 'light-classes'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          {type === 'usage' && (
            <>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Exams</span>
              </div>
            </>
          )}
        </div>
        <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
          <option>Last 6 Months</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center px-1">
              {type === 'usage' ? (
                <div className="flex items-end space-x-1 w-full justify-center">
                  <div 
                    className="w-3 bg-primary-600 rounded-t"
                    style={{ height: `${(item.users / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="w-3 bg-secondary-600 rounded-t"
                    style={{ height: `${(item.exams / maxValue) * 100}%` }}
                  ></div>
                </div>
              ) : (
                <div 
                  className="w-6 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t"
                  style={{ height: `${(item.revenue / maxValue) * 100}%` }}
                ></div>
              )}
              <div className="text-xs text-gray-500 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {type === 'usage' ? '3,800' : '$32,500'}
          </div>
          <div className="text-sm text-gray-500">Current</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {type === 'usage' ? '+42%' : '+38%'}
          </div>
          <div className="text-sm text-gray-500">Growth</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {type === 'usage' ? '15,200' : '$138,700'}
          </div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;