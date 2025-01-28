import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CampsRow = ({ camp, refetch, index }) => {
    const handleCampDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/delete-camp/${camp._id}`, { withCredentials: true })
            Swal.fire({
                title: "Camp successfully removed.",
                icon: "success",
                draggable: true
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

    return (
        <tr
            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition duration-150`}
        >
            <td className="py-3 px-5 border-b border-gray-200 text-gray-800">
                {camp.name}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 text-gray-600">
                {new Date(camp.time).toLocaleDateString()}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 text-gray-600">
                {camp.location}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 text-gray-600">
                {camp.professionalName}
            </td>
            <td className="py-3 px-5 border-b border-gray-200 flex justify-center gap-4">

                <Link to={`/dashboard/update-camp/${camp._id}`}

                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 shadow transition duration-200"
                >
                    Update
                </Link>
                <button
                    onClick={handleCampDelete}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 shadow transition duration-200"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default CampsRow;