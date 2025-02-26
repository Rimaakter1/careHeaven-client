import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex bg-white">
            <Sidebar />
            <div className="flex-1 overflow-y-auto max-h-screen">
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
