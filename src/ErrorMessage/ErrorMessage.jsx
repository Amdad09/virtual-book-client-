import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import errorLottie from '../assets/lottie/error.json';
const ErrorMessage = () => {
    return (
       
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-800">
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="text-9xl font-bold text-red-500 mb-4">
                <div>
                     <Lottie animationData={errorLottie} loop={true} />
                </div>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl font-semibold text-red-500 -mt-12">
                Oops!! Page not found.
            </motion.p>

            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                }}
                className="mt-10">
                <Link
                    to="/"
                    className="bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-amber-700 transition duration-300">
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorMessage;
