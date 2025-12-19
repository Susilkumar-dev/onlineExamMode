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
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Registered platform users',
      count: 2847
    },
    {
      title: 'Active Exams',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: '📝',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Ongoing assessments',
      count: 156
    },
    {
      title: 'Revenue',
      value: '$24,580',
      change: '+23.1%',
      trend: 'up',
      icon: '💰',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      description: 'This month\'s revenue',
      count: 24580
    },
    {
      title: 'Avg. Score',
      value: '78.5%',
      change: '-2.3%',
      trend: 'down',
      icon: '📊',
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-500',
      description: 'Average exam performance',
      count: 78.5
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '↗' : '↘';
  };

  const getTrendColor = (trend, isDark) => {
    if (trend === 'up') {
      return isDark ? 'text-green-400' : 'text-green-600';
    } else {
      return isDark ? 'text-red-400' : 'text-red-600';
    }
  };

  const getTrendBg = (trend, isDark) => {
    if (trend === 'up') {
      return isDark ? 'bg-green-900/30' : 'bg-green-100';
    } else {
      return isDark ? 'bg-red-900/30' : 'bg-red-100';
    }
  };

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
            }`}>
              Dashboard Analytics
            </span>
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
              Performance Overview
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real-time insights and statistics about your platform's performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 ${
                isDark 
                  ? 'bg-dark-800/50 hover:bg-dark-700 border border-dark-700 text-gray-100' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-900'
              } shadow-lg hover:shadow-2xl cursor-pointer`}
              onClick={() => console.log(`Clicked ${stat.title}`)}
            >
              {/* Gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}></div>
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className={`text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.title}
                  </p>
                  
                  <p className={`text-3xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </p>
                  
                  <div className="flex items-center">
                    <div className={`flex items-center px-3 py-1.5 rounded-full ${getTrendBg(stat.trend, isDark)}`}>
                      <span className={`text-sm font-semibold mr-1 ${getTrendColor(stat.trend, isDark)}`}>
                        {getTrendIcon(stat.trend)}
                      </span>
                      <span className={`text-sm font-semibold ${getTrendColor(stat.trend, isDark)}`}>
                        {stat.change}
                      </span>
                    </div>
                    
                    <span className={`text-sm ml-3 ${
                      isDark ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      from last month
                    </span>
                  </div>
                </div>
                
                {/* Icon Container */}
                <div className={`relative p-3 rounded-xl ${
                  isDark 
                    ? `bg-gradient-to-br ${stat.gradient} bg-opacity-20`
                    : `bg-gradient-to-br ${stat.gradient} bg-opacity-10`
                }`}>
                  <div className={`text-2xl ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {stat.description}
              </p>
              
              {/* Progress bar for visualization */}
              <div className={`mt-4 h-2 rounded-full ${
                isDark ? 'bg-dark-700' : 'bg-gray-200'
              } overflow-hidden`}>
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                  style={{ width: `${Math.min(100, (stat.count / 3000) * 100)}%` }}
                ></div>
              </div>
              
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Additional Stats Summary */}
        <div className={`rounded-2xl p-6 mb-12 ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Platform Growth Metrics
              </h3>
              <p className={`mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Monthly performance comparison
              </p>
            </div>
            
            <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isDark
                ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
            }`}>
              View Details →
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'New Users', value: '324', change: '+14%', trend: 'up' },
              { label: 'Exams Completed', value: '1,248', change: '+21%', trend: 'up' },
              { label: 'Avg. Time Spent', value: '42min', change: '+8%', trend: 'up' },
              { label: 'Support Tickets', value: '23', change: '-12%', trend: 'down' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.value}
                </div>
                <div className={`text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.label}
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  item.trend === 'up'
                    ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                    : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                }`}>
                  <span className="mr-1">{item.trend === 'up' ? '↗' : '↘'}</span>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;