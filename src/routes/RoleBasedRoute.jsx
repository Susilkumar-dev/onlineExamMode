import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, userRole, allowedRoles }) => {
  console.log('RoleBasedRoute check:', { userRole, allowedRoles });
  
  if (!userRole) {
    console.log('No user role, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(userRole)) {
    console.log('Role not allowed, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('Role allowed, rendering children');
  return children;
};

export default RoleBasedRoute;