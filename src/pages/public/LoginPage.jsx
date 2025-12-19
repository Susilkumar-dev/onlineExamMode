import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../component/auth/LoginForm';
import ThemeWrapper from '../../component/common/ThemeWrapper';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { useTheme } from '../../context/ThemeContext';

const LoginPage = () => {
  const themeClasses = useThemeClasses();
  const { isDark } = useTheme();

  return (
    <ThemeWrapper>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full relative">
          
          {/* Back Arrow Button - Positioned left of login card */}
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
            <Link
              to="/"
              className={`group inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-dark-700 text-gray-300 hover:bg-dark-600 border border-dark-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } shadow-lg hover:shadow-xl`}
              title="Back to Home"
            >
              <svg 
                className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
          </div>

          {/* Header/Logo Area */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isDark
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500'
              }`}>
                <span className="text-2xl font-bold text-white">EP</span>
              </div>
            </div>
            
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              Welcome Back
            </h1>
            <p className={`mt-2 ${themeClasses.text.secondary}`}>
              Please sign in to continue
            </p>
          </div>

          {/* Glassmorphism Login Card */}
          <div className={`rounded-2xl p-8 transition-all duration-300 shadow-2xl ${
            isDark
              ? 'bg-glass-dark-card backdrop-blur-glass border border-gray-700/50'
              : 'bg-glass-light-card backdrop-blur-glass border border-gray-200/50'
          }`}>
            <LoginForm />
          </div>
          
          {/* Theme Toggle in Login Page */}
          <div className="mt-8 flex justify-center">
            <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-full ${
              isDark
                ? 'bg-dark-700/50 border border-dark-600'
                : 'bg-white/50 border border-gray-300'
            }`}>
              <span className={`text-sm ${themeClasses.text.secondary}`}>
                {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </span>
              <div className="relative inline-block w-12 h-6">
                <div className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600'
                    : 'bg-gradient-to-r from-primary-400 to-secondary-400'
                }`}></div>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
                  isDark ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className={`mt-8 text-center text-sm ${themeClasses.text.muted}`}>
            <p className="mb-4">
              By signing in, you agree to our{' '}
              <a 
                href="#" 
                className={`underline hover:text-primary-500 transition-colors duration-300 ${
                  isDark ? 'text-primary-400' : 'text-primary-600'
                }`}
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a 
                href="#" 
                className={`underline hover:text-primary-500 transition-colors duration-300 ${
                  isDark ? 'text-primary-400' : 'text-primary-600'
                }`}
              >
                Privacy Policy
              </a>
            </p>
            
            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Need Help?
              </a>
              <a 
                href="#" 
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact Support
              </a>
              <a 
                href="#" 
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                System Status
              </a>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/4 -left-8 w-16 h-16 rounded-full blur-2xl opacity-20 animate-float">
            <div className={`w-full h-full rounded-full ${
              isDark 
                ? 'bg-primary-500/30' 
                : 'bg-primary-300/30'
            }`}></div>
          </div>
          <div className="absolute -z-10 bottom-1/4 -right-8 w-16 h-16 rounded-full blur-2xl opacity-20 animate-float" style={{animationDelay: '2s'}}>
            <div className={`w-full h-full rounded-full ${
              isDark 
                ? 'bg-secondary-500/30' 
                : 'bg-secondary-300/30'
            }`}></div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default LoginPage;