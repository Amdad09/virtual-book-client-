import React from 'react';
import { Link } from 'react-router';

const ErrorMessage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className='text-center'>
                <h3 className="font-black text-9xl text-red-600">404</h3>
                <p className='my-3 text-3xl font-bold'>Page Not Found</p>
                <button className="btn">
                    <Link to="/">Back Home</Link>
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;