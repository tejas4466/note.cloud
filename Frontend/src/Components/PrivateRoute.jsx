// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.userData);

  if (!user) {
    // If no user is authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the children (protected route components)
}

export default PrivateRoute;