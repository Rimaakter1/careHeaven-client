import React from "react";
import { Link } from "react-router-dom";
import { FaRegFrownOpen } from "react-icons/fa"; // More expressive error icon

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
            <div className="w-full max-w-lg p-10 bg-gray-50 rounded-lg shadow-lg text-center">
                <FaRegFrownOpen className="text-8xl text-red-600 mx-auto mb-6" />
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Oops! The page you're looking for can't be found.</h2>
                <p className="text-lg text-gray-600 mb-8">
                    It seems the page has been moved, deleted, or never existed. Let's get you back on track!
                </p>
                <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md transform hover:scale-105"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
