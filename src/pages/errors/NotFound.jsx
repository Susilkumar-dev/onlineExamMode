import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-9xl font-bold text-primary-600 mb-8">404</div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
          >
            Go to Homepage
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these pages:</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link to="/login" className="text-primary-600 hover:text-primary-700">
                Login
              </Link>
              <Link to="/register" className="text-primary-600 hover:text-primary-700">
                Register
              </Link>
              <Link to="/student/dashboard" className="text-primary-600 hover:text-primary-700">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;