import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const RoleTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleSetRole = (role) => {
    const mockUser = {
      id: 1,
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@exam.com`,
      role: role
    };
    
    dispatch(setUser(mockUser));
    
    // Navigate to appropriate dashboard
    setTimeout(() => {
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Role-Based Authentication Test
        </h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-medium text-gray-700 mb-2">Current Status:</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Authenticated:</span>{' '}
              <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </p>
            {user && (
              <>
                <p className="text-sm">
                  <span className="font-medium">Role:</span>{' '}
                  <span className="text-blue-600 font-medium">{user.role}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">User:</span> {user.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Test Different Roles:</h3>
          
          <button
            onClick={() => handleSetRole('admin')}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Login as Admin
          </button>
          
          <button
            onClick={() => handleSetRole('teacher')}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Login as Teacher
          </button>
          
          <button
            onClick={() => handleSetRole('student')}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Login as Student
          </button>
          
          <button
            onClick={() => dispatch(setUser(null))}
            className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="font-medium text-gray-700 mb-3">Test URLs:</h3>
          <div className="space-y-2 text-sm">
            <p>• <a href="/admin/dashboard" className="text-blue-600 hover:underline">/admin/dashboard</a></p>
            <p>• <a href="/teacher/dashboard" className="text-blue-600 hover:underline">/teacher/dashboard</a></p>
            <p>• <a href="/student/dashboard" className="text-blue-600 hover:underline">/student/dashboard</a></p>
            <p>• <a href="/" className="text-blue-600 hover:underline">Home</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleTest;