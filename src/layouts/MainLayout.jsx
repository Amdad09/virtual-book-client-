import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="py-14">
                <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                    <Outlet />
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
