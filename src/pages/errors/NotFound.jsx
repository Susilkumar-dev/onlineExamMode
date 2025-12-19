import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const NotFound = () => {
  const { isDark } = useTheme();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "404 - Page Not Found";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 flex items-center justify-center p-4 ${
      isDark 
        ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900' 
        : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'
    }`}>
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 with particles */}
        <div className="relative mb-12">
          <div className={`text-9xl font-bold bg-gradient-to-r ${
            isDark 
              ? 'from-primary-400 via-secondary-400 to-primary-400' 
              : 'from-primary-600 via-secondary-600 to-primary-600'
          } bg-clip-text text-transparent mb-4 animate-pulse`}>
            404
          </div>
          
          {/* Animated typing effect */}
          <div className={`text-2xl font-mono font-bold mb-2 h-8 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full animate-bounce ${
                  isDark ? 'bg-primary-400' : 'bg-primary-500'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Main message */}
        <div className={`mb-8 p-6 rounded-2xl backdrop-blur-sm ${
          isDark 
            ? 'bg-dark-800/30 border border-dark-700/50' 
            : 'bg-white/30 border border-gray-200/50'
        } shadow-2xl`}>
          <div className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Lost in Cyberspace?
          </div>
          
          <p className={`text-lg mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Don't worry, even the best explorers sometimes take wrong turns. 
            Let's get you back on track!
          </p>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            isDark ? 'bg-dark-700/50' : 'bg-gray-100'
          }`}>
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Current URL:
            </span>
            <code className={`font-mono text-sm px-2 py-1 rounded ${
              isDark ? 'bg-dark-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}>
              {window.location.pathname}
            </code>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            to="/"
            className={`group relative p-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            <span className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-2xl">🏠</span>
              <span>Homepage</span>
              <span className="text-xs opacity-80">Return to safety</span>
            </span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className={`group relative p-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-dark-800/50 hover:bg-dark-700/50 text-gray-300 border border-dark-700'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            } shadow-lg hover:shadow-xl`}
          >
            <span className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-2xl">↩️</span>
              <span>Go Back</span>
              <span className="text-xs opacity-80">Previous page</span>
            </span>
          </button>
        </div>
        
        {/* Quick Links */}
        <div className={`mb-8 p-6 rounded-2xl ${
          isDark 
            ? 'bg-dark-800/30 border border-dark-700/50' 
            : 'bg-white/30 border border-gray-200/50'
        }`}>
          <h4 className={`font-semibold mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Quick Navigation
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { path: '/dashboard', name: 'Dashboard', icon: '📊', color: 'blue' },
              { path: '/courses', name: 'Courses', icon: '📚', color: 'green' },
              { path: '/exams', name: 'Exams', icon: '📝', color: 'purple' },
              { path: '/profile', name: 'Profile', icon: '👤', color: 'yellow' },
              { path: '/settings', name: 'Settings', icon: '⚙️', color: 'red' },
              { path: '/help', name: 'Help', icon: '❓', color: 'indigo' }
            ].map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className={`group flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'hover:bg-dark-700/50'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className={`text-xl p-3 rounded-full mb-2 ${
                  isDark 
                    ? `bg-${link.color}-900/30 text-${link.color}-400` 
                    : `bg-${link.color}-100 text-${link.color}-600`
                }`}>
                  {link.icon}
                </div>
                <span className={`text-xs font-medium ${
                  isDark 
                    ? 'text-gray-400 group-hover:text-gray-300' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className={`p-4 rounded-xl ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white/50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className={`text-2xl ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              💬
            </div>
            <h4 className={`font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Need Help?
            </h4>
          </div>
          <p className={`text-sm mb-3 ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Contact our support team if you need assistance
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-2 text-sm font-medium ${
              isDark 
                ? 'text-primary-400 hover:text-primary-300' 
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <span>Contact Support</span>
            <span>→</span>
          </Link>
        </div>

        {/* Footer */}
        <div className={`mt-8 pt-6 border-t ${
          isDark ? 'border-dark-700' : 'border-gray-200'
        }`}>
          <p className={`text-xs ${
            isDark ? 'text-gray-600' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} ExamPro Platform • 
            Error 404 • Path: {window.location.pathname}
          </p>
        </div>
      </div>

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Animated gradient orbs */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-spin-slow ${
          isDark 
            ? 'bg-gradient-to-r from-primary-900/10 via-transparent to-secondary-900/10' 
            : 'bg-gradient-to-r from-primary-100/30 via-transparent to-secondary-100/30'
        }`} style={{animationDuration: '20s'}}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-spin ${
          isDark 
            ? 'bg-gradient-to-r from-secondary-900/10 via-transparent to-primary-900/10' 
            : 'bg-gradient-to-r from-secondary-100/30 via-transparent to-primary-100/30'
        }`} style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        
        {/* Grid overlay */}
        <div className={`absolute inset-0 opacity-[0.03] ${
          isDark ? 'bg-grid-white' : 'bg-grid-gray-900'
        } bg-[size:50px_50px]`}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isDark ? 'bg-white/5' : 'bg-gray-900/5'
            }`}
            style={{
              width: Math.random() * 10 + 2 + 'px',
              height: Math.random() * 10 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          ></div>
        ))}
      </div>

      {/* Add custom animation keyframes in global CSS or style tag */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;