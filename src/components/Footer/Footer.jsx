import React from "react";
import logo from "../../assets/footerLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-14">
            <div className="text-gray-800 dark:text-gray-200 w-11/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="mr-10">
                        <img className="w-32" src={logo} alt="Logo" />
                        <p className="text-gray-600 dark:text-gray-400">
                            We aim to connect individuals to quality medical services through
                            organized medical camps across the region.
                        </p>
                    </div>

                    <div className="ml-0 lg:ml-5">
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="link link-hover dark:text-gray-400">Home</Link>
                            </li>
                            <li>
                                <Link to="/available-camps" className="link link-hover dark:text-gray-400">Available Camps</Link>
                            </li>
                            <li>
                                <Link to="/all-services" className="link link-hover dark:text-gray-400">Services</Link>
                            </li>

                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="tel:+123456789" className="link link-hover dark:text-gray-400">
                                    Phone: +123456789
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@example.com" className="link link-hover dark:text-gray-400">
                                    Email: info@example.com
                                </a>
                            </li>
                            <li className="dark:text-gray-400">
                                Address: 123 Medical Camp Street, City, Country
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4">Subscribe to Updates</h3>
                        <p className="mb-2 text-gray-600 dark:text-gray-300">
                            Stay informed about our latest medical camps and updates.
                        </p>
                        <div className="flex items-center space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-300"
                            />
                            <button className="btn btn-primary dark:bg-blue-500 dark:hover:bg-blue-600">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center border-t pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Medical Camps. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
