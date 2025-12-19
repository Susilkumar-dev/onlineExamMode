import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    theme: 'light',
    notifications: [],
    modal: {
      isOpen: false,
      type: null,
      data: null
    },
    toast: {
      isOpen: false,
      message: '',
      type: 'info'
    },
    loading: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
        read: false,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null
      };
    },
    showToast: (state, action) => {
      state.toast = {
        isOpen: true,
        message: action.payload.message,
        type: action.payload.type || 'info'
      };
    },
    hideToast: (state) => {
      state.toast.isOpen = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  setTheme,
  addNotification,
  markNotificationRead,
  clearNotifications,
  openModal,
  closeModal,
  showToast,
  hideToast,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer; 