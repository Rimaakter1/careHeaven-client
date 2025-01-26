import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const CampDetails = () => {
    const { campId } = useParams();
    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ["camp", campId],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/camp/${campId}`, {
                withCredentials: true,
            });
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-xl font-bold text-gray-600">Loading Camp Details...</div>
            </div>
        );
    }

    if (!camp) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-xl font-bold text-red-600">Camp details not found!</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
            <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="mt-6">
                <h1 className="text-4xl font-extrabold text-gray-800">{camp.name}</h1>
                <p className="text-gray-700 text-base mt-4">{camp.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Fees</p>
                    <span className="text-lg font-bold text-blue-600">${camp.Fees}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Date & Time</p>
                    <span className="text-lg font-bold text-green-600">
                        {new Date(camp.time).toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Location</p>
                    <span className="text-lg font-bold text-purple-600">{camp.location}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Healthcare Professional</p>
                    <span className="text-lg font-bold text-indigo-600">
                        {camp.professionalName}
                    </span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Participants</p>
                    <span className="text-lg font-bold text-red-600">{camp.participantCount}</span>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-semibold text-lg rounded-md shadow-md transition-all"
                >
                    Join Camp
                </button>
            </div>
        </div>
    );
};

export default CampDetails;
