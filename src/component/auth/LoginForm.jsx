import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { useTheme } from '../../context/ThemeContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // For demo purposes, automatically select the right user
      let demoEmail = formData.email;
      if (formData.email === 'admin@exam.com') demoEmail = 'admin@exam.com';
      else if (formData.email === 'teacher@exam.com') demoEmail = 'teacher@exam.com';
      else if (formData.email === 'student@exam.com') demoEmail = 'student@exam.com';
      
      const result = await dispatch(loginUser({ 
        email: demoEmail, 
        password: formData.password 
      }));
      
      if (result.type.includes('fulfilled')) {
        const user = result.payload;
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
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

  // Demo credentials for quick login
  const handleDemoLogin = (role) => {
    let email, password;
    
    switch(role) {
      case 'admin':
        email = 'admin@exam.com';
        password = 'admin123';
        break;
      case 'teacher':
        email = 'teacher@exam.com';
        password = 'teacher123';
        break;
      case 'student':
        email = 'student@exam.com';
        password = 'student123';
        break;
      default:
        return;
    }
    
    setFormData({
      email,
      password,
      role,
      rememberMe: false
    });
    
    // Auto submit after setting credentials
    setTimeout(() => {
      const submitEvent = new Event('submit', { cancelable: true });
      handleSubmit(submitEvent);
    }, 100);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Welcome Back
        </h2>
        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Sign in to your account
        </p>
      </div>

      {/* Demo Login Buttons */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium mb-3 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Try Demo Accounts:
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleDemoLogin('admin')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-red-900/30 text-red-300 hover:bg-red-800/40 border border-red-800'
                : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleDemoLogin('teacher')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/40 border border-blue-800'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200'
            }`}
          >
            Teacher
          </button>
          <button
            onClick={() => handleDemoLogin('student')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-green-900/30 text-green-300 hover:bg-green-800/40 border border-green-800'
                : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
            }`}
          >
            Student
          </button>
        </div>
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
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className={`block text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              Forgot password?
            </Link>
          </div>
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
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className={`h-4 w-4 rounded focus:ring-2 ${
              isDark
                ? 'text-primary-400 focus:ring-primary-500 border-dark-500 bg-dark-700'
                : 'text-primary-600 focus:ring-primary-500 border-gray-300'
            }`}
          />
          <label htmlFor="rememberMe" className={`ml-2 block text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Remember me
          </label>
        </div>

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
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className={`font-medium transition-colors duration-300 ${
                isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;