import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime, options = {}) => {
  const {
    autoStart = true,
    onComplete,
    onTick,
    format = 'seconds'
  } = options;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsComplete(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(initialTime);
    setIsRunning(autoStart);
    setIsComplete(false);
  }, [initialTime, autoStart]);

  const addTime = useCallback((seconds) => {
    setTime(prev => prev + seconds);
  }, []);

  const subtractTime = useCallback((seconds) => {
    setTime(prev => Math.max(0, prev - seconds));
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => {
          const newTime = prev - 1;
          
          if (onTick) {
            onTick(newTime);
          }
          
          if (newTime <= 0) {
            setIsRunning(false);
            setIsComplete(true);
            if (onComplete) onComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, onTick, onComplete]);

  // Format time
  const formatTime = useCallback(() => {
    if (format === 'minutes') {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    if (format === 'hours') {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return time; // Return in seconds
  }, [time, format]);

  const getProgress = useCallback(() => {
    return (time / initialTime) * 100;
  }, [time, initialTime]);

  return {
    time,
    formattedTime: formatTime(),
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    addTime,
    subtractTime,
    getProgress
  };
};