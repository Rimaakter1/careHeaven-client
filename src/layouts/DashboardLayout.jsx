import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div>
            <div className='relative min-h-screen md:flex bg-white'>
                {/* Left Side: Sidebar Component */}
                <Sidebar />
                {/* Right Side: Dashboard Dynamic Content */}
                <div className='flex-1  md:ml-64'>
                    <div className='p-5'>
                        {/* Outlet for dynamic contents */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;