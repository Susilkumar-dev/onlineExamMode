import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeButton = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const { isDark } = useTheme();
  
  const baseClasses = 'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none';
  
  const variants = {
    primary: `bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl ${
      isDark ? 'shadow-primary-900/30' : 'shadow-primary-500/30'
    }`,
    secondary: `${
      isDark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 focus:ring-gray-500 border border-gray-600' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-500 border border-gray-200'
    } shadow-lg hover:shadow-xl`,
    outline: `${
      isDark 
        ? 'border-2 border-primary-400 text-primary-400 hover:bg-primary-900/20 focus:ring-primary-400' 
        : 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
    }`,
    ghost: `${
      isDark 
        ? 'text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500' 
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
    }`,
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white focus:ring-red-500 shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white focus:ring-green-500 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-sm',
    large: 'px-8 py-4 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </div>
      ) : children}
    </button>
  );
};

export default ThemeButton;