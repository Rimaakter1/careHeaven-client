import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
    const [feedback, setFeedback] = useState("");
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { data: camps = [], isLoading } = useQuery({
        queryKey: ["RegisteredCamps"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/participants/${user.email}`);
            return response.data;
        },
    });

    console.log(camps);



    const handleCancel = async (campId) => {
        if (confirm("Are you sure you want to cancel this registration?")) {
            await axios.delete(`http://localhost:5000/cancel-registration/${campId}`);
            queryClient.invalidateQueries("RegisteredCamps");
        }
    };


    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">My Registered Camps</h1>
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
                    {camps.map((camp) => (
                        <tr key={camp.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{camp.campName}</td>
                            <td className="border border-gray-300 px-4 py-2">{camp.campFees}</td>
                            <td className="border border-gray-300 px-4 py-2">{camp.participantName}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {camp.paymentStatus === "paid" ? (
                                    <span className="text-green-600 font-semibold">Paid</span>
                                ) : (
                                    <Link to={`/dashboard/payment/${camp.campId}`}
                                        className="btn btn-sm btn-primary"
                                        disabled={camp.paymentStatus === "paid"}
                                    >
                                        Pay
                                    </Link>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {camp.paymentConfirmationStatus}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                <button
                                    className={`btn btn-sm ${camp.paymentStatus === "paid" ? "btn-disabled" : "btn-warning"}`}
                                    onClick={() => handleCancel(camp.id)}
                                    disabled={camp.paymentStatus === "paid"}
                                >
                                    Cancel
                                </button>

                            </td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                {camp.paymentStatus === "paid" && camp.paymentConfirmationStatus === "Confirmed" ?
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleFeedbackSubmit(camp.id)}
                                    >
                                        Feedback
                                    </button> : <button>
                                        N/A
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {feedback && (
                <div className="mt-4">
                    <textarea
                        placeholder="Leave your feedback"
                        className="textarea textarea-bordered w-full"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                </div>
            )}
        </section>
    );
};

export default RegisteredCamps;
