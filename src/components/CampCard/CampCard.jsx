import React from "react";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <img
                src={camp.image}
                alt={camp.name}
                className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-grow flex flex-col space-y-3">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{camp.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">Details: {camp.details}</p>

                <div className="mt-auto w-full">
                    <Link
                        to={`/camp-details/${camp._id}`}
                        className="bg-blue-600 text-white p-3 font-bold rounded-lg w-full block text-center hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                    >
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CampCard;
