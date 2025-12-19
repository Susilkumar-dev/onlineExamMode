import { useEffect, useRef, useState } from 'react';

export const useSocket = (url, options = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    // Create WebSocket connection
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // Connection opened
    socket.addEventListener('open', () => {
      setIsConnected(true);
      setError(null);
      console.log('WebSocket connected');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
        
        // Call message handler if provided
        if (options.onMessage) {
          options.onMessage(data);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    });

    // Connection closed
    socket.addEventListener('close', () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    });

    // Error handling
    socket.addEventListener('error', (event) => {
      setError('WebSocket error occurred');
      console.error('WebSocket error:', event);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, options.onMessage]);

  const sendMessage = (data) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify(data));
      return true;
    }
    return false;
  };

  const closeConnection = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  return {
    isConnected,
    lastMessage,
    error,
    sendMessage,
    closeConnection
  };
};