import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ navItems }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  // Handler for the "New Exam" button
  const handleNewExamClick = () => {
    // Navigate to exam creation page
    navigate('/teacher/create-exam');
    // Alternatively, you could:
    // 1. Open a modal: setShowNewExamModal(true)
    // 2. Open a form: setShowNewExamForm(true)
  };

  // Handler for the "Need Help?" button
  const handleNeedHelpClick = () => {
    // Navigate to help page
    navigate('/help');
    // Alternatively, you could:
    // 1. Open external link: window.open('https://help.example.com', '_blank')
    // 2. Open contact modal: setShowContactModal(true)
  };

  return (
    <aside className={`${
      isExpanded ? 'w-64' : 'w-20'
    } transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900 border-r border-gray-800 text-gray-100' 
        : 'bg-white border-r border-gray-200 text-gray-700'
    }`}>
      <div className="p-4">
        {/* Collapse/Expand button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex justify-end mb-4 p-2 rounded-lg transition-colors ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
        >
          {isExpanded ? '«' : '»'}
        </button>
        
        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                const baseClasses = `flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                  isExpanded ? 'justify-start' : 'justify-center'
                }`;
                
                if (isActive) {
                  return `${baseClasses} ${
                    isDark 
                      ? 'bg-gradient-to-r from-primary-700 to-secondary-700 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  }`;
                }
                
                return `${baseClasses} ${
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                }`;
              }}
            >
              <span className={`${isExpanded ? 'text-xl mr-3' : 'text-2xl'}`}>
                {item.icon}
              </span>
              {isExpanded && (
                <span className="font-medium">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Actions */}
        {isExpanded && (
          <div className={`mt-8 pt-8 ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } border-t`}>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>QUICK ACTIONS</h3>
            <button 
              onClick={handleNewExamClick}
              className={`w-full font-medium py-2 px-4 rounded-lg mb-2 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-md hover:shadow-lg' 
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-md hover:shadow-lg'
              }`}
            >
              + New Exam
            </button>
            <button 
              onClick={handleNeedHelpClick}
              className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 shadow-sm hover:shadow' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm hover:shadow'
              }`}
            >
              Need Help?
            </button>
          </div>
        )}

        {/* Theme Toggle in Sidebar */}
        {isExpanded && (
          <div className={`mt-8 pt-8 ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } border-t`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${
                  isDark 
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600' 
                    : 'bg-gradient-to-r from-primary-400 to-secondary-400'
                }`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-0'
                }`}>
                  {isDark ? (
                    <span className="text-xs flex items-center justify-center h-full">🌙</span>
                  ) : (
                    <span className="text-xs flex items-center justify-center h-full">☀️</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;