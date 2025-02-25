import React from "react";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <img
                src={camp.image}
                alt={camp.name}
                className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-grow flex flex-col space-y-3">
                <h3 className="text-xl font-semibold text-blue-700">{camp.name}</h3>
                <p>Details: {camp.details}</p>

                <div className="mt-auto w-full">
                    <Link
                        to={`/camp-details/${camp._id}`}
                        className="bg-blue-600 text-white p-3 font-bold rounded-lg w-full block text-center"
                    >
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CampCard;
