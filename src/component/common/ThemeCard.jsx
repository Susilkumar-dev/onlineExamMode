import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeCard = ({ 
  children, 
  className = '', 
  padding = 'medium',
  hover = true,
  onClick,
  ...props
}) => {
  const { isDark } = useTheme();
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const hoverClass = hover 
    ? 'hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer' 
    : '';

  return (
    <div 
      onClick={onClick}
      className={`rounded-xl shadow-lg ${
        isDark 
          ? 'bg-gray-900/90 border border-gray-800' 
          : 'bg-white border border-gray-200'
      } ${paddingClasses[padding]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ThemeCard;