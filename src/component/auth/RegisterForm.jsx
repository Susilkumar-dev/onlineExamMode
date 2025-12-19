import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Create Account
        </h2>
        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Join thousands of institutions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className={`${
            isDark ? 'bg-red-900/30 border border-red-800 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'
          } px-4 py-3 rounded-lg`}>
            {errors.general}
          </div>
        )}

        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.name 
                ? `border-red-300 focus:ring-red-500 ${isDark ? 'bg-dark-700 text-gray-100' : 'bg-white text-gray-900'}`
                : `focus:ring-primary-500 ${isDark ? 'bg-dark-700 border-dark-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.email 
                ? `border-red-300 focus:ring-red-500 ${isDark ? 'bg-dark-700 text-gray-100' : 'bg-white text-gray-900'}`
                : `focus:ring-primary-500 ${isDark ? 'bg-dark-700 border-dark-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="role" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            I am a
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
              isDark ? 'bg-dark-700 border-dark-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.password 
                ? `border-red-300 focus:ring-red-500 ${isDark ? 'bg-dark-700 text-gray-100' : 'bg-white text-gray-900'}`
                : `focus:ring-primary-500 ${isDark ? 'bg-dark-700 border-dark-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Must be at least 8 characters
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.confirmPassword 
                ? `border-red-300 focus:ring-red-500 ${isDark ? 'bg-dark-700 text-gray-100' : 'bg-white text-gray-900'}`
                : `focus:ring-primary-500 ${isDark ? 'bg-dark-700 border-dark-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className={`h-4 w-4 rounded focus:ring-2 mt-1 ${
              isDark
                ? 'text-primary-400 focus:ring-primary-500 border-dark-500 bg-dark-700'
                : 'text-primary-600 focus:ring-primary-500 border-gray-300'
            }`}
          />
          <label htmlFor="agreeTerms" className={`ml-2 block text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            I agree to the{' '}
            <Link 
              to="/terms" 
              className={`transition-colors duration-300 ${
                isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link 
              to="/privacy" 
              className={`transition-colors duration-300 ${
                isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
            isLoading
              ? isDark ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white'
              : isDark
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
          }`}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        <div className="text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className={`font-medium transition-colors duration-300 ${
                isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;