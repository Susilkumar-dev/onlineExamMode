import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const DashboardCards = () => {
   const { isDark } = useTheme();
  
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Active Exams',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: '📝',
      color: 'green'
    },
    {
      title: 'Revenue',
      value: '$24,580',
      change: '+23.1%',
      trend: 'up',
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Avg. Score',
      value: '78.5%',
      change: '-2.3%',
      trend: 'down',
      icon: '📊',
      color: 'yellow'
    }
  ];

  return (
    <div className={`your-classes ${isDark ? 'dark-classes' : 'light-classes'}`}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-2">from last month</span>
              </div>
            </div>
            <div className={`text-3xl p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
  );
};

export default DashboardCards;