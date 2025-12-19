import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PageWrapper = ({ 
  children, 
  title, 
  description, 
  showBackButton = true,
  actions = null 
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
              title="Go back"
            >
              <span className="text-xl">←</span>
            </button>
          )}
          
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {title}
            </h1>
            {description && (
              <p className={`mt-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>

      {/* Page Content */}
      <div className={`rounded-xl shadow-lg transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900/80 border border-gray-800' 
          : 'bg-white border border-gray-200'
      }`}>
        {children}
      </div>

      {/* Floating Back Button for Mobile */}
      <div className="fixed bottom-6 left-6 z-50 md:hidden">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-xl' 
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-xl'
          }`}
          title="Go back"
        >
          <span className="text-xl">←</span>
        </button>
      </div>
    </div>
  );
};

export default PageWrapper;