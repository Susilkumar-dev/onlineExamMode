import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hooks for specific state slices
export const useAuth = () => {
  return useSelector(state => state.auth);
};

export const useExams = () => {
  return useSelector(state => state.exams);
};

export const useUI = () => {
  return useSelector(state => state.ui);
};

export const useUsers = () => {
  return useSelector(state => state.users);
};

// Selectors for derived state
export const useCurrentExam = () => {
  return useSelector(state => state.exams.currentExam);
};

export const useExamResults = () => {
  return useSelector(state => state.exams.results);
};

export const useUserRole = () => {
  return useSelector(state => state.auth.user?.role);
};

export const useIsAuthenticated = () => {
  return useSelector(state => state.auth.isAuthenticated);
};

export const useNotifications = () => {
  return useSelector(state => state.ui.notifications);
};

export const useUnreadNotifications = () => {
  return useSelector(state => 
    state.ui.notifications.filter(n => !n.read).length
  );
};