import { authAPI } from './api';
import { useAuth } from '../hooks/useAuth';

class AuthService {
  constructor() {
    this.tokenKey = 'exampro_token';
    this.userKey = 'exampro_user';
  }

  // Login user
  async login(email, password) {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.success) {
        const { token, user } = response.data;
        this.setToken(token);
        this.setUser(user);
        return { success: true, user };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await authAPI.forgotPassword(email);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send reset email.'
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await authAPI.logout();
    } finally {
      this.clearAuth();
    }
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Get auth token
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Set auth token
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Set user data
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Clear auth data
  clearAuth() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  // Check user role
  hasRole(role) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    return user.role === role;
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await authAPI.updateProfile(userData);
      if (response.data.success) {
        this.setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile.'
      };
    }
  }
}

export default new AuthService();