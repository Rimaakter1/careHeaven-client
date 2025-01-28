import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import SearchBar from "../../../components/SearchBar/SearchBar";

const RegisteredCamps = () => {
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCampId, setSelectedCampId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const { user } = useAuth();

    const { data: camps = [], isLoading, refetch } = useQuery({
        queryKey: ["RegisteredCamps"],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5000/participants/${user.email}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        },
    });

    const handleCancel = async (campId) => {
        if (confirm("Are you sure you want to cancel this registration?")) {
            await axios.delete(`http://localhost:5000/cancel-registration/${campId}`, {
                withCredentials: true,
            });
            refetch();
            alert("Registration canceled");
        }
    };

    const handleFeedbackSubmit = async () => {
        if (feedback.trim() && rating > 0) {
            await axios.post(
                `http://localhost:5000/submit-feedback`,
                {
                    campId: selectedCampId,
                    feedback,
                    rating,
                    participantName: user.displayName,
                    participantEmail: user.email,
                    photo: user.photoURL,
                },
                {
                    withCredentials: true,
                }
            );
            alert("Feedback submitted!");
            setIsModalOpen(false);
            setFeedback("");
            setRating(0);
        } else {
            alert("Please provide valid feedback and a rating.");
        }
    };

    const filteredCamps = camps.filter((camp) =>
        camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCamps.length / rowsPerPage);
    const paginatedCamps = filteredCamps.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">My Registered Camps</h1>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                        <th className="border border-gray-300 px-4 py-2">Camp Fees</th>
                        <th className="border border-gray-300 px-4 py-2">Participant Name</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
                        <th className="border border-gray-300 px-4 py-2">Cancel Button</th>
                        <th className="border border-gray-300 px-4 py-2">Feedback Button</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCamps.map((camp) => (
                        <tr key={camp.campId} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{camp.campName}</td>
                            <td className="border border-gray-300 px-4 py-2">{camp.campFees}</td>
                            <td className="border border-gray-300 px-4 py-2">{camp.participantName}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {camp.paymentStatus === "paid" ? (
                                    <span className="text-green-600 font-semibold">Paid</span>
                                ) : (
                                    <Link
                                        to={`/dashboard/payment/${camp._id}`}
                                        className="btn btn-sm btn-primary"
                                        disabled={camp.paymentStatus === "Paid"}
                                    >
                                        {camp.paymentStatus === "Paid" ? camp.paymentStatus : "Pay"}
                                    </Link>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{camp.paymentConfirmationStatus}</td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                <button
                                    className={`btn btn-sm ${camp.paymentStatus === "paid" ? "btn-disabled" : "btn-warning"
                                        }`}
                                    onClick={() => handleCancel(camp.campId)}
                                    disabled={camp.paymentStatus === "Paid"}
                                >
                                    Cancel
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                {camp.paymentStatus === "Paid" && camp.paymentConfirmationStatus === "Confirmed" ? (
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => {
                                            setSelectedCampId(camp.campId);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Feedback
                                    </button>
                                ) : (
                                    <button>N/A</button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {filteredCamps.length === 0 && (
                        <tr>
                            <td colSpan="5" className="py-4 text-center text-gray-500">
                                No camp found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-sm"
                >
                    Previous
                </button>
                <span className="text-center">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm"
                >
                    Next
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFeedbackSubmit}
                feedback={feedback}
                setFeedback={setFeedback}
                rating={rating}
                setRating={setRating}
            />
        </section>
    );
};

export default RegisteredCamps;
