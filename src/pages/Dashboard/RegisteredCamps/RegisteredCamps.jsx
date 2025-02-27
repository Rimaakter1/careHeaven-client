import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

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
                `https://care-heaven-server.vercel.app/participants/${user.email}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        },
    });

    const handleCancel = async (campId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Cancel this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`https://care-heaven-server.vercel.app/cancel-registration/${campId}`, {
                    withCredentials: true,
                });
                Swal.fire({
                    title: "Registration canceled!",
                    icon: "success"
                });
                refetch();
            }
        });
    };

    const handleFeedbackSubmit = async () => {
        if (feedback.trim() && rating > 0) {
            await axios.post(
                `https://care-heaven-server.vercel.app/submit-feedback`,
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
            Swal.fire({
                title: "Feedback submitted!",
                icon: "success",
                draggable: true
            });
            setIsModalOpen(false);
            setFeedback("");
            setRating(0);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please provide valid feedback and a rating.",
            });
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

    if (isLoading) return <Loading />;

    return (
        <section className="py-8 px-4 dark:bg-gray-800 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center dark:text-white">My Registered Camps</h1>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-900">
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Camp Name</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Camp Fees</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Participant Name</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Confirmation Status</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Cancel</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCamps.map((camp) => (
                        <tr key={camp.campId} className="text-center dark:bg-gray-900">
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{camp.campName}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{camp.campFees}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{camp.participantName}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {camp.paymentStatus === "paid" ? (
                                    <span className="text-green-600 dark:text-green-400 font-semibold">Paid</span>
                                ) : (
                                    <Link
                                        to={`/dashboard/payment/${camp._id}`}
                                        className="btn btn-sm btn-primary dark:bg-blue-500 dark:text-white"
                                        disabled={camp.paymentStatus === "Paid"}
                                    >
                                        {camp.paymentStatus === "Paid" ? camp.paymentStatus : "Pay"}
                                    </Link>
                                )}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{camp.paymentConfirmationStatus}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                <button
                                    className={`btn btn-sm ${camp.paymentStatus === "paid" ? "btn-disabled" : "btn-warning  dark:text-white"}`}
                                    onClick={() => handleCancel(camp.campId)}
                                    disabled={camp.paymentStatus === "Paid"}
                                >
                                    Cancel
                                </button>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {camp.paymentStatus === "Paid" && camp.paymentConfirmationStatus === "Confirmed" ? (
                                    <button
                                        className="btn btn-sm btn-secondary dark:bg-gray-700 dark:text-white"
                                        onClick={() => {
                                            setSelectedCampId(camp.campId);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Feedback
                                    </button>
                                ) : (
                                    <button className="dark:text-gray-400">N/A</button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {filteredCamps.length === 0 && (
                        <tr>
                            <td colSpan="7" className="py-4 text-center text-gray-500 dark:text-gray-400">
                                No camp found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

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
