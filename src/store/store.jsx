import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import examReducer from './slices/examSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice'; // Make sure this import exists

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examReducer,
    ui: uiReducer,
    users: userReducer, // This should match the imported userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['exams/updateAnswer'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['exams.currentExam.answers', 'ui.modal.data']
      }
    })
});

export default store;