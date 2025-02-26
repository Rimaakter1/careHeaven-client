import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CampsRow from "../../../../components/Dashboard/CampsRow/CampsRow";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import Loading from "../../../../components/Loading/Loading";

const ManageCamps = () => {
    const { data: camps = [], isLoading, refetch } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axios.get('https://care-heaven-server.vercel.app/camps');
            return data;
        },
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const filteredCamps = camps.filter((camp) => {
        const query = searchQuery.toLowerCase();
        const formattedCampDate = camp.time
            ? new Date(camp.time).toLocaleDateString('en-US') : '';
        return (
            (camp.name && camp.name.toLowerCase().includes(query)) ||
            (formattedCampDate && formattedCampDate.includes(query)) ||
            (camp.professionalName && camp.professionalName.toLowerCase().includes(query))
        );
    });

    const indexOfLastCamp = currentPage * pageSize;
    const indexOfFirstCamp = indexOfLastCamp - pageSize;
    const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);
    const totalPages = Math.ceil(filteredCamps.length / pageSize);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg p-1 md:p-2 lg:p-10 border border-gray-300 dark:border-gray-700 max-w-7xl mx-auto">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">Manage Camps</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                    View, edit, or delete your camps in a streamlined interface.
                </p>
            </header>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-200 to-blue-300 dark:from-gray-700 dark:to-gray-800 text-left text-gray-800 dark:text-gray-200 font-semibold">
                            <th className="py-3 px-5 text-sm uppercase">Camp Name</th>
                            <th className="py-3 px-5 text-sm uppercase">Date & Time</th>
                            <th className="py-3 px-5 text-sm uppercase">Location</th>
                            <th className="py-3 px-5 text-sm uppercase">Professional</th>
                            <th className="py-3 px-5 text-sm uppercase text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCamps.map((camp, index) => (
                            <CampsRow key={camp._id} camp={camp} refetch={refetch} index={index} />
                        ))}
                        {currentCamps.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500 dark:text-gray-400">
                                    No camp found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-gray-700 dark:text-gray-300">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageCamps;
