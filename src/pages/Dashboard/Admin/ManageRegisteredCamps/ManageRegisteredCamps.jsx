import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageRegisteredCamps = () => {
    const { data: registeredParticipants = [], isLoading, refetch } = useQuery({
        queryKey: ["manageRegisteredParticipants"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/payments", {
                withCredentials: true,
            });
            return response.data;
        },
    });
    console.log(registeredParticipants);


    const handleCancel = async (participantId) => {
        if (window.confirm("Are you sure you want to cancel this registration?")) {
            try {
                await axios.delete(`http://localhost:5000/cancel-registered-participant/${participantId}`);
                refetch();
                alert('Registration successfully cancelled');
            } catch (err) {
                alert('Error cancelling registration');
            }
        }
    };

    const handleConfirmPayment = async (participantId) => {
        try {
            await axios.patch(`http://localhost:5000/update-confirmation/${participantId}`, {
                paymentConfirmationStatus: 'Confirmed',
                withCredentials: true,
            });
            refetch();
            alert('Payment confirmed successfully');
        } catch (err) {
            alert('Error confirming payment');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">All Registered Participants</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Participant Name</th>
                        <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                        <th className="border border-gray-300 px-4 py-2">Camp Fees</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
                        <th className="border border-gray-300 px-4 py-2">Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {registeredParticipants.map(participant => (
                        <tr key={participant.participantId} className="text-center">
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
                                        className="btn btn-sm btn-primary"
                                    >
                                        {
                                            participant.paymentConfirmationStatus
                                        }
                                    </button>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {participant.paymentStatus === "Paid" && participant.paymentConfirmationStatus === "Confirmed" ? (
                                    <button disabled className="btn btn-sm btn-disabled">
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCancel(participant.participantId)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ManageRegisteredCamps;
