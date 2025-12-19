import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const HeroSection = () => {
  const { isDark } = useTheme();

  return (
    <section className={`relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900' 
        : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'
    }`}>
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Revolutionize Your
                <span className={`block transition-colors duration-300 ${
                  isDark ? 'text-primary-400' : 'text-primary-600'
                }`}>
                  Exam Experience
                </span>
              </h1>
              <p className={`text-lg md:text-xl mb-8 max-w-2xl transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A comprehensive online examination platform with real-time proctoring, 
                coding assessments, and AI-powered analytics for educational institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  to="/register" 
                  className={`text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                  }`}
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/login" 
                  className={`border-2 text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'border-primary-400 text-primary-400 hover:bg-primary-400/10 hover:border-primary-300 hover:text-primary-300'
                      : 'border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700'
                  }`}
                >
                  Try Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center md:justify-start space-x-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                          isDark ? 'border-dark-800 bg-primary-600' : 'border-white bg-primary-500'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className={`ml-3 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    5000+ Active Users
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Illustration */}
            <div className="relative">
              <div className={`relative z-10 rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition duration-500 ${
                isDark ? 'bg-dark-800' : 'bg-white'
              }`}>
                <div className={`bg-gradient-to-r from-primary-500 to-secondary-500 h-64 rounded-xl mb-6 flex items-center justify-center ${
                  isDark ? 'border border-primary-400/20' : ''
                }`}>
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-bold">Live Exam Interface</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg transition-colors duration-300 ${
                    isDark ? 'bg-primary-900/30 text-primary-300' : 'bg-primary-50 text-primary-600'
                  }`}>
                    <div className={`font-bold text-lg transition-colors duration-300 ${
                      isDark ? 'text-primary-400' : 'text-primary-600'
                    }`}>
                      95%
                    </div>
                    <div className={`transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Success Rate
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg transition-colors duration-300 ${
                    isDark ? 'bg-secondary-900/30 text-secondary-300' : 'bg-secondary-50 text-secondary-600'
                  }`}>
                    <div className={`font-bold text-lg transition-colors duration-300 ${
                      isDark ? 'text-secondary-400' : 'text-secondary-600'
                    }`}>
                      24/7
                    </div>
                    <div className={`transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Support
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full -z-10 transition-colors duration-300 ${
                isDark ? 'bg-primary-900/20' : 'bg-primary-100'
              }`}></div>
              <div className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full -z-10 transition-colors duration-300 ${
                isDark ? 'bg-secondary-900/20' : 'bg-secondary-100'
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;