// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('auth_token'); // O el método que uses para verificar autenticación

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
