import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logOut();
    };

    const links = (
        <>
            <Link className="mr-8" to="/">Home</Link>
            <Link className='mr-8' to="/available-camps">Available Camps</Link>
            <Link to="/all-services">Services</Link>
        </>
    );

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#10273D]/80 backdrop-blur-md shadow-md' : 'bg-[#10273D]'
            }`}>
            <div className='navbar w-11/12 mx-auto md:w-10/12'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow text-lg"
                        >
                            {links}
                        </ul>
                    </div>
                    <img className="w-24" src={logo} alt="Logo" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white text-lg">{links}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer">
                                <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-md w-48"
                            >
                                <li className="font-bold mb-2 text-black">{user?.displayName}</li>
                                <li>
                                    <Link to="/dashboard" className="text-sm">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-sm">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <Link
                                to="/login"
                                className="py-3 rounded-lg bg-[#0495FF] text-white border-none px-8 text-lg"
                            >
                                Join Us
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
