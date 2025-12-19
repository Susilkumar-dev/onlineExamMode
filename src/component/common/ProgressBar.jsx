import React from 'react';

const ProgressBar = ({ 
  value, 
  max = 100,
  size = 'medium',
  showLabel = true,
  color = 'primary',
  labelPosition = 'inside'
}) => {
  const percentage = (value / max) * 100;
  
  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-4'
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600'
  };

  return (
    <div className="w-full">
      {showLabel && labelPosition === 'outside' && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{percentage.toFixed(1)}%</span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && labelPosition === 'inside' && (
            <div className="flex justify-center items-center h-full">
              <span className="text-xs font-medium text-white px-2">
                {percentage.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;