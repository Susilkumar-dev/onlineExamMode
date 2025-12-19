import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(state => state.auth);

  const login = async (email, password) => {
    return dispatch(loginUser({ email, password }));
  };

  const logout = async () => {
    return dispatch(logoutUser());
  };

  const checkPermission = (requiredRole) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.role === requiredRole;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    hasPermission: checkPermission
  };
};