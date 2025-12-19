import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../component/auth/RegisterForm';
import { useTheme } from '../../context/ThemeContext';

const RegisterPage = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark 
        ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900' 
        : 'bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30'
    }`}>
      <div className="max-w-md w-full relative">
        {/* Back Arrow Button - Left side of the card */}
        <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
          <Link
            to="/login"
            className={`group inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
              isDark
                ? 'bg-dark-700 text-gray-300 hover:bg-dark-600 border border-dark-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            } shadow-lg hover:shadow-xl`}
            title="Back to Login"
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

        <div className={`rounded-2xl shadow-2xl ${
          isDark 
            ? 'bg-glass-dark-card backdrop-blur-glass border border-gray-700/50' 
            : 'bg-glass-light-card backdrop-blur-glass border border-gray-200/50'
        } p-8`}>
          <RegisterForm />
        </div>
        
        <div className={`mt-8 text-center text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Already have an account? <a href="/login" className="text-primary-500 hover:text-primary-600 font-medium">Sign in here</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;