import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-9xl font-bold text-yellow-600 mb-8">403</div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;