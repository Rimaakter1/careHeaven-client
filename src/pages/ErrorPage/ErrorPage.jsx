import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-8xl font-bold text-blue-700">404</h1>
            <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
                The page you are looking for doesn’t exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-lg shadow-md transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
