import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleLogout = () => {
        logOut();
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const links = (
        <>
            <Link className="mr-8" to="/">Home</Link>
            <Link className='mr-8' to="/available-camps">Available Camps</Link>
            <Link to="/all-services">Services</Link>
        </>
    );

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
            ${isScrolled ? 'bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-gray-100 dark:bg-gray-900'}
        `}>
            <div className='navbar w-11/12 mx-auto md:w-10/12'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-black dark:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box mt-3 w-52 p-2 shadow text-lg text-black dark:text-white">
                            {links}
                        </ul>
                    </div>
                    <img className="w-24" src={logo} alt="Logo" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-black dark:text-white text-lg">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer">
                                <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
                            </label>
                            <ul className="dropdown-content menu p-2 shadow bg-white dark:bg-gray-800 rounded-md w-48 text-black dark:text-white">
                                <li className="font-bold mb-2">{user?.displayName}</li>
                                <li>
                                    <Link to="/dashboard" className="text-sm">Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-sm">Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="py-3 rounded-lg bg-blue-500 text-white border-none px-8 text-lg">
                            Join Us
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
