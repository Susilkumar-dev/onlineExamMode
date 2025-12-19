import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 p-1 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white transform transition-all duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <span className="flex items-center justify-center h-full text-gray-900 text-sm">🌙</span>
        ) : (
          <span className="flex items-center justify-center h-full text-yellow-500 text-sm">☀️</span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;