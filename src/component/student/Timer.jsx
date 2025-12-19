import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeUp, isRunning = true, format = 'default' }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(isRunning);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            clearInterval(interval);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const handlePause = () => {
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    if (format === 'compact') {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
  };

  const getTimeColor = () => {
    const percentage = (timeLeft / initialTime) * 100;
    
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = () => {
    const percentage = (timeLeft / initialTime) * 100;
    
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`${format === 'compact' ? 'inline-flex items-center' : ''}`}>
      <div className={`${format === 'compact' ? 'flex items-center space-x-2' : 'bg-white rounded-xl shadow-lg p-6'}`}>
        {/* Timer Display */}
        <div className={`text-center ${format === 'compact' ? '' : 'mb-4'}`}>
          <div className={`font-bold ${format === 'compact' ? 'text-xl' : 'text-3xl'} ${getTimeColor()}`}>
            {formatTime(timeLeft)}
          </div>
          {format !== 'compact' && (
            <div className="text-sm text-gray-500 mt-1">
              {isActive ? 'Time remaining' : 'Paused'}
            </div>
          )}
        </div>

        {/* Progress Bar (only in full format) */}
        {format !== 'compact' && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor()}`}
                style={{ width: `${(timeLeft / initialTime) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>{Math.round(((initialTime - timeLeft) / initialTime) * 100)}% elapsed</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Controls (only in full format) */}
        {format !== 'compact' && (
          <div className="flex justify-center space-x-4">
            {isActive ? (
              <button
                onClick={handlePause}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                ⏸ Pause
              </button>
            ) : (
              <button
                onClick={handleResume}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ▶ Resume
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              ↺ Reset
            </button>
          </div>
        )}

        {/* Status indicator for compact format */}
        {format === 'compact' && (
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
            <span className="text-sm text-gray-500">
              {isActive ? 'Running' : 'Paused'}
            </span>
          </div>
        )}
      </div>

      {/* Warning messages */}
      {format !== 'compact' && timeLeft < 300 && timeLeft > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">⚠️</span>
            <span className="text-red-800 font-medium">
              {timeLeft < 60 
                ? `Less than ${timeLeft} second${timeLeft === 1 ? '' : 's'} remaining!` 
                : `Only ${Math.ceil(timeLeft / 60)} minute${Math.ceil(timeLeft / 60) === 1 ? '' : 's'} remaining!`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;