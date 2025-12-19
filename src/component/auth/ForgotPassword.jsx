import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDark } = useTheme();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
            isDark ? 'bg-green-900/30' : 'bg-green-100'
          } mb-4`}>
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <h2 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Check Your Email
          </h2>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We've sent password reset instructions to <strong className={isDark ? 'text-gray-300' : 'text-gray-800'}>{email}</strong>
          </p>
        </div>
        
        <div className={`${
          isDark ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-200'
        } rounded-lg p-4 mb-6`}>
          <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
            If you don't see the email, check your spam folder or try again.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => setIsSubmitted(false)}
            className={`w-full font-medium py-2 transition-colors duration-300 ${
              isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            Try another email
          </button>
          <Link
            to="/login"
            className={`block w-full py-3 rounded-lg text-center font-medium transition-all duration-300 hover:scale-[1.02] ${
              isDark
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
            }`}
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Forgot Password?
        </h2>
        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Enter your email and we'll send you reset instructions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              error 
                ? `border-red-300 focus:ring-red-500 ${isDark ? 'bg-dark-700 text-gray-100' : 'bg-white text-gray-900'}`
                : `focus:ring-primary-500 ${isDark ? 'bg-dark-700 border-dark-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`
            }`}
            placeholder="you@example.com"
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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
          {isLoading ? 'Sending...' : 'Send Reset Instructions'}
        </button>

        <div className="text-center">
          <Link 
            to="/login" 
            className={`font-medium transition-colors duration-300 ${
              isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;