// Stats.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Stats = () => {
  const { isDark } = useTheme();
  const [counts, setCounts] = useState({
    exams: 0,
    institutions: 0,
    students: 0,
    uptime: 0
  });

  const stats = [
    { 
      number: '50K+', 
      label: 'Exams Conducted', 
      icon: '📚',
      target: 50000,
      suffix: '+'
    },
    { 
      number: '200+', 
      label: 'Institutions', 
      icon: '🏫',
      target: 200,
      suffix: '+'
    },
    { 
      number: '500K+', 
      label: 'Students', 
      icon: '👨‍🎓',
      target: 500000,
      suffix: '+'
    },
    { 
      number: '99.9%', 
      label: 'Uptime', 
      icon: '⚡',
      target: 99.9,
      suffix: '%'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        exams: prev.exams < 50000 ? prev.exams + 1000 : 50000,
        institutions: prev.institutions < 200 ? prev.institutions + 4 : 200,
        students: prev.students < 500000 ? prev.students + 10000 : 500000,
        uptime: prev.uptime < 99.9 ? prev.uptime + 0.5 : 99.9
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative py-20 md:py-32 overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-r from-primary-900/30 via-dark-800 to-secondary-900/30' 
        : 'bg-gradient-to-r from-primary-500 via-blue-500 to-secondary-500'
    }`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold text-white">Trust & Reliability</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Educational
            <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Leaders Worldwide
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of institutions revolutionizing their examination process with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`group relative cursor-pointer rounded-2xl p-8 text-center backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                  : 'bg-white/10 hover:bg-white/20 border border-white/20'
              }`}
              whileHover={{ y: -10 }}
              onClick={() => console.log(`Clicked ${stat.label}`)}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-full ${
                  isDark ? 'bg-white/10' : 'bg-white/20'
                } flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500`}>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </div>
              
              {/* Animated counter */}
              <div className="relative mb-3">
                <div className="text-4xl md:text-5xl font-bold text-white">
                  {index === 0 && counts.exams.toLocaleString()}
                  {index === 1 && counts.institutions.toLocaleString()}
                  {index === 2 && counts.students.toLocaleString()}
                  {index === 3 && counts.uptime.toFixed(1)}
                  <span className="text-white/80">{stat.suffix}</span>
                </div>
                
                {/* Animated underline */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-16 ${
                  isDark ? 'bg-primary-400' : 'bg-white'
                } rounded-full transition-all duration-500`}></div>
              </div>
              
              <div className={`text-lg font-medium ${
                isDark ? 'text-gray-300' : 'text-white'
              }`}>
                {stat.label}
              </div>
              
              {/* Click hint */}
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDark ? 'text-primary-300' : 'text-white'
              }`}>
                Click for details
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional stats */}
        <div className="mt-16 pt-16 border-t border-white/20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={() => console.log('Clicked 24/7 Support')}>
              <div className="text-2xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90">Customer Support</div>
            </div>
            
            <div className={`text-center p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={() => console.log('Clicked Question Types')}>
              <div className="text-2xl font-bold text-white mb-2">30+</div>
              <div className="text-white/90">Question Types</div>
            </div>
            
            <div className={`text-center p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={() => console.log('Clicked Integrations')}>
              <div className="text-2xl font-bold text-white mb-2">15+</div>
              <div className="text-white/90">Integrations</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className={`group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-white text-primary-900 hover:bg-gray-100'
              : 'bg-white text-primary-700 hover:bg-gray-50'
          } shadow-2xl`}
          onClick={() => console.log('Clicked Join Now')}>
            <span className="relative z-10">Join Our Growing Community</span>
            <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">→</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;