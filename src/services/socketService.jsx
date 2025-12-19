import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  // Connect to WebSocket server
  connect(token) {
    if (this.socket?.connected) return;

    const socketUrl = import.meta.env.VITE_WS_URL || 'http://localhost:5000';
    
    this.socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  // Setup event listeners
  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.emit('user:connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Forward all events to registered listeners
    this.socket.onAny((event, ...args) => {
      const listeners = this.listeners.get(event) || [];
      listeners.forEach(listener => listener(...args));
    });
  }

  // Emit event
  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  // Listen to event
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Join exam room
  joinExam(examId) {
    this.emit('exam:join', { examId });
  }

  // Leave exam room
  leaveExam(examId) {
    this.emit('exam:leave', { examId });
  }

  // Send exam progress
  sendProgress(examId, progress) {
    this.emit('exam:progress', { examId, progress });
  }

  // Send proctoring alert
  sendProctoringAlert(examId, alert) {
    this.emit('proctoring:alert', { examId, alert });
  }

  // Send exam submission
  sendSubmission(examId, submission) {
    this.emit('exam:submit', { examId, submission });
  }

  // Get live exam data
  getLiveExamData(examId) {
    this.emit('exam:live:get', { examId });
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  // Check connection status
  isConnected() {
    return this.socket?.connected || false;
  }

  // Get socket ID
  getSocketId() {
    return this.socket?.id;
  }
}

export default new SocketService();