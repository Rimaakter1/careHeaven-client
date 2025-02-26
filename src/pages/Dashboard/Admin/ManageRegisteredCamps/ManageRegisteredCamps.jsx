import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";

const ManageRegisteredCamps = () => {
    const { data: registeredParticipants = [], isLoading, refetch } = useQuery({
        queryKey: ["manageRegisteredParticipants"],
        queryFn: async () => {
            const response = await axios.get("https://care-heaven-server.vercel.app/payments", {
                withCredentials: true,
            });
            return response.data;
        },
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredParticipants = registeredParticipants.filter((participant) => {
        const query = searchQuery.toLowerCase();
        return (
            participant.participantName.toLowerCase().includes(query) ||
            participant.campName.toLowerCase().includes(query) ||
            participant.paymentStatus.toLowerCase().includes(query)
        );
    });

    const indexOfLastParticipant = currentPage * rowsPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - rowsPerPage;
    const currentParticipants = filteredParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);

    const handleCancel = async (participantId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`https://care-heaven-server.vercel.app/cancel-registered-participant/${participantId}`, {
                            withCredentials: true
                        });
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                    } catch (err) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Error cancelling registration",
                        });
                    }

                }
            });
    };

    const handleConfirmPayment = async (participantId) => {
        try {
            await axios.patch(`https://care-heaven-server.vercel.app/update-confirmation/${participantId}`, {
                paymentConfirmationStatus: 'Confirmed',
                withCredentials: true,
            });
            refetch();
            Swal.fire({
                title: "Successfully Confirmed",
                icon: "success",
                draggable: true
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error confirming",
            });
        }
    };

    if (isLoading) return <Loading></Loading>;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="py-8 px-4 dark:bg-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">All Registered Participants</h1>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="border border-gray-300 px-4 py-2">Participant Name</th>
                        <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                        <th className="border border-gray-300 px-4 py-2">Camp Fees</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
                        <th className="border border-gray-300 px-4 py-2">Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {currentParticipants.map(participant => (
                        <tr key={participant.participantId} className="text-center hover:bg-gray-100 dark:hover:bg-gray-600">
                            <td className="border border-gray-300 px-4 py-2">{participant.participantName}</td>
                            <td className="border border-gray-300 px-4 py-2">{participant.campName}</td>
                            <td className="border border-gray-300 px-4 py-2">{participant.campFees}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {participant.paymentStatus === "Paid" ? (
                                    <span className="text-green-600">Paid</span>
                                ) : (
                                    <span className="text-red-600">Unpaid</span>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {participant.paymentConfirmationStatus === "Confirmed" ? (
                                    <span className="text-green-600">Confirmed</span>
                                ) : (
                                    <button
                                        onClick={() => handleConfirmPayment(participant.participantId)}
                                        disabled={participant.paymentStatus !== "Paid"}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 shadow transition duration-200"
                                    >
                                        Confirm Payment
                                    </button>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {participant.paymentStatus === "Paid" && participant.paymentConfirmationStatus === "Confirmed" ? (
                                    <button disabled className="bg-gray-500 text-white py-1 px-4 rounded-lg cursor-not-allowed">
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCancel(participant.participantId)}
                                        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 shadow transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {currentParticipants.length === 0 && (
                        <tr>
                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                No registered camp.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 shadow transition duration-200 mr-2"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="font-semibold">{`Page ${currentPage}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 shadow transition duration-200 ml-2"
                    disabled={currentPage * rowsPerPage >= filteredParticipants.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;
