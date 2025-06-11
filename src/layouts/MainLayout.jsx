import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-14">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
