import React from "react";

const CampCard = ({ camp }) => {
    console.log(camp);
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <img
                src={camp.image}
                alt={camp.name}
                className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-blue-700">{camp.name}</h3>
                <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Fees:</span> ${camp.Fees}
                </p>
                <p className="text-gray-700 mt-1">
                    <span className="font-semibold">Date & Time:</span> {new Date(camp.time).toLocaleString()}
                </p>
                <p className="text-gray-700 mt-1">
                    <span className="font-semibold">Location:</span> {camp.location}
                </p>
                <p className="text-gray-700 mt-1">
                    <span className="font-semibold">Healthcare Professional:</span> {camp.professionalName}
                </p>
                <p className="text-gray-700 mt-1">
                    <span className="font-semibold">Participants:</span> {camp.participantCount}
                </p>

                <div className="mt-auto">
                    <button className="bg-blue-600 text-white p-3 font-bold rounded-lg w-full mt-4">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampCard;
