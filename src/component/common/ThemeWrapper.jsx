import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30 text-gray-900'
    }`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;