import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading/>
    }

    if (!user) {
        return (
           
                <Navigate to='/logIn' state={{ from: location }} replace />
        );
    }
    return children;
};

export default PrivateRoute;