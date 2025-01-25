import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CampsRow from "../../../../components/Dashboard/CampsRow/CampsRow";

const ManageCamps = () => {
    const { data: camps = [], isLoading, refetch } = useQuery({
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
                            <CampsRow key={camp._id} camp={camp} refetch={refetch} index={index}></CampsRow>
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
