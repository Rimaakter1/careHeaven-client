import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const links = (
        <>
            <Link className='mr-8' to='/'><a>Home</a></Link>
            <Link to='/available-camps'><a>Available Camps</a></Link>
        </>
    );

    return (
        <div className="navbar bg-[#10273D] lg:px-8 md:px-4">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow  text-lg">
                        {links}
                    </ul>
                </div>
                <img className="w-28" src={logo} alt="Logo" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white text-lg">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <div>
                    <Link to='/login' className="py-3 rounded-lg bg-[#0495FF] text-white border-none px-8 text-lg">
                        Join Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
