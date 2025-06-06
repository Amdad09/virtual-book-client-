import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user } = use(AuthContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to='/logIn' state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;