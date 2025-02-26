import axios from 'axios';
import React from 'react';
import { TiArrowSyncOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CampsRow = ({ camp, refetch, index }) => {
    const handleCampDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://care-heaven-server.vercel.app/delete-camp/${camp._id}`, { withCredentials: true })
                    Swal.fire({
                        title: "Deleted!",
                        text: "Camp been deleted.",
                        icon: "success"
                    });
                    refetch()
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to remove",
                    });
                }
            }
        });
    }

    return (
        <tr
            className={`${index % 2 === 0
                ? "bg-white dark:bg-gray-800"
                : "bg-gray-50 dark:bg-gray-700"
                } hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150`}
        >
            <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                {camp.name}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                {new Date(camp.time).toLocaleDateString()}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                {camp.location}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                {camp.professionalName}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-600 flex justify-center gap-4">
                <Link
                    to={`/dashboard/update-camp/${camp._id}`}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 shadow transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Update
                </Link>
                <button
                    onClick={handleCampDelete}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 shadow transition duration-200 dark:bg-red-600 dark:hover:bg-red-700"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default CampsRow;
