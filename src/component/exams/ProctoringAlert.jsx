import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const ProctoringAlert = ({ type, message, onClose, autoClose = 5000 }) => {
  const [visible, setVisible] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const getAlertStyles = () => {
    const baseStyles = 'fixed top-4 right-4 z-50 max-w-md border rounded-lg shadow-lg p-4 animate-slide-in';
    
    if (isDark) {
      switch(type) {
        case 'warning':
          return `${baseStyles} bg-yellow-900/30 border-yellow-800 text-yellow-200`;
        case 'error':
          return `${baseStyles} bg-red-900/30 border-red-800 text-red-200`;
        case 'info':
          return `${baseStyles} bg-blue-900/30 border-blue-800 text-blue-200`;
        case 'success':
          return `${baseStyles} bg-green-900/30 border-green-800 text-green-200`;
        default:
          return `${baseStyles} bg-gray-800 border-gray-700 text-gray-200`;
      }
    } else {
      switch(type) {
        case 'warning':
          return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
        case 'error':
          return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
        case 'info':
          return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
        case 'success':
          return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
        default:
          return `${baseStyles} bg-gray-50 border-gray-200 text-gray-800`;
      }
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '📢';
    }
  };

  if (!visible) return null;

  return (
    <div className={getAlertStyles()}>
      <div className="flex items-start">
        <div className="flex-shrink-0 text-xl mr-3">{getIcon()}</div>
        <div className="flex-1">
          <div className="font-medium mb-1">Proctoring Alert</div>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className={`ml-4 flex-shrink-0 ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
        >
          ×
        </button>
      </div>
      
      {/* Progress bar for auto-close */}
      {autoClose && (
        <div className={`mt-3 w-full rounded-full h-1 ${isDark ? 'bg-current bg-opacity-20' : 'bg-current bg-opacity-25'}`}>
          <div 
            className="h-1 rounded-full bg-current animate-shrink"
            style={{ animationDuration: `${autoClose}ms` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProctoringAlert;