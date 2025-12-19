// Features.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Features = () => {
  const { isDark } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: '👁️',
      title: 'AI Proctoring',
      description: 'Advanced AI monitoring with facial recognition and screen recording',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: isDark ? 'bg-blue-900/30' : 'bg-blue-100',
      iconColor: isDark ? 'text-blue-400' : 'text-blue-600',
      stats: '99% Accuracy'
    },
    {
      icon: '💻',
      title: 'Code Execution',
      description: 'Real-time code compilation for 20+ programming languages',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: isDark ? 'bg-purple-900/30' : 'bg-purple-100',
      iconColor: isDark ? 'text-purple-400' : 'text-purple-600',
      stats: '20+ Languages'
    },
    {
      icon: '📊',
      title: 'Live Analytics',
      description: 'Real-time performance tracking and detailed analytics dashboard',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: isDark ? 'bg-green-900/30' : 'bg-green-100',
      iconColor: isDark ? 'text-green-400' : 'text-green-600',
      stats: 'Real-time Data'
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Bank-level encryption and secure exam environment',
      gradient: 'from-red-500 to-orange-500',
      iconBg: isDark ? 'bg-red-900/30' : 'bg-red-100',
      iconColor: isDark ? 'text-red-400' : 'text-red-600',
      stats: '256-bit SSL'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Responsive design that works on all devices',
      gradient: 'from-yellow-500 to-amber-500',
      iconBg: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100',
      iconColor: isDark ? 'text-yellow-400' : 'text-yellow-600',
      stats: '100% Responsive'
    },
    {
      icon: '🤖',
      title: 'Auto Grading',
      description: 'Automated grading system with manual review capability',
      gradient: 'from-indigo-500 to-violet-500',
      iconBg: isDark ? 'bg-indigo-900/30' : 'bg-indigo-100',
      iconColor: isDark ? 'text-indigo-400' : 'text-indigo-600',
      stats: 'Instant Results'
    }
  ];

  return (
    <section className={`py-20 md:py-32 transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800' 
        : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-4">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Powerful Features</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Everything You Need for
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              Modern Education
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comprehensive tools to conduct, monitor, and evaluate online examinations effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                isDark
                  ? 'bg-dark-800/50 hover:bg-dark-700/70 border border-dark-700 hover:border-dark-600'
                  : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              } shadow-lg hover:shadow-2xl`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => console.log(`Clicked ${feature.title}`)}
            >
              {/* Hover gradient effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon with animated background */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <span className={`text-3xl ${feature.iconColor}`}>{feature.icon}</span>
                </div>
                
                {/* Animated indicator */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white text-xs font-bold transform group-hover:rotate-90 transition-transform duration-500`}>
                  +
                </div>
              </div>
              
              <h3 className={`text-xl font-bold mb-3 group-hover:translate-x-2 transition-transform duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`mb-6 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
              
              {/* Stats badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                isDark
                  ? 'bg-gradient-to-r from-dark-700 to-dark-800 text-gray-300'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></span>
                {feature.stats}
              </div>
              
              {/* Learn more link */}
              <div className={`mt-6 flex items-center gap-2 text-sm font-medium ${
                isDark ? 'text-primary-400' : 'text-primary-600'
              } group-hover:gap-3 transition-all duration-300`}>
                <span>Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Animated divider */}
        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800 relative">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full ${
            isDark ? 'bg-dark-800' : 'bg-white'
          } shadow-lg`}>
            <span className={`text-sm font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>And much more...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;