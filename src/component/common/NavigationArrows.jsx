import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const NavigationArrow = ({ 
  direction = 'back',
  showText = false,
  className = ''
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleClick = () => {
    if (direction === 'back') {
      navigate(-1);
    } else if (direction === 'forward') {
      navigate(1);
    }
  };

  const getIcon = () => {
    if (direction === 'back') return '←';
    if (direction === 'forward') return '→';
    return '←';
  };

  const getText = () => {
    if (direction === 'back') return 'Back';
    if (direction === 'forward') return 'Forward';
    return 'Back';
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
        isDark 
          ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
      } ${className}`}
      title={direction === 'back' ? 'Go back' : 'Go forward'}
    >
      <span className="text-xl">{getIcon()}</span>
      {showText && <span>{getText()}</span>}
    </button>
  );
};

export default NavigationArrow;