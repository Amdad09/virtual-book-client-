import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        <div className='flex justify-center items-center min-h-screen'>
            <span className="loading loading-dots loading-xl"></span>
        </div>;
    }

    if (!user) {
        return <Navigate to='/logIn' state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;