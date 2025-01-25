import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ManageCamps = () => {
    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/camps');
            return data;
        },
    });

    if (isLoading) return <h1 className="text-center text-lg text-gray-600">Loading.....</h1>;

    return (
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 shadow-lg rounded-lg p-1 md:p-2 lg:p-10 border border-gray-300 max-w-7xl mx-auto">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-700">Manage Camps</h1>
                <p className="mt-2 text-lg text-gray-600">
                    View, edit, or delete your camps in a streamlined interface.
                </p>
            </header>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-200 to-blue-300 text-left text-gray-800 font-semibold">
                            <th className="py-3 px-5 text-sm uppercase">Camp Name</th>
                            <th className="py-3 px-5 text-sm uppercase">Date & Time</th>
                            <th className="py-3 px-5 text-sm uppercase">Location</th>
                            <th className="py-3 px-5 text-sm uppercase">Professional</th>
                            <th className="py-3 px-5 text-sm uppercase text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((camp, index) => (
                            <tr
                                key={camp._id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100 transition duration-150`}
                            >
                                <td className="py-3 px-5 border-b border-gray-200 text-gray-800">
                                    {camp.name}
                                </td>
                                <td className="py-3 px-5 border-b border-gray-200 text-gray-600">
                                    {camp.time}
                                </td>
                                <td className="py-3 px-5 border-b border-gray-200 text-gray-600">
                                    {camp.location}
                                </td>
                                <td className="py-3 px-5 border-b border-gray-200 text-gray-600">
                                    {camp.professionalName}
                                </td>
                                <td className="py-3 px-5 border-b border-gray-200 flex justify-center gap-4">
                                    <button
                                        onClick={() => console.log("Update:", camp._id)}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 shadow transition duration-200"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => console.log("Delete:", camp._id)}
                                        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 shadow transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {camps.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                    No camps available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;
