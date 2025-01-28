import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
    const { user } = useAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["paymentHistory", user.email],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/payments/${user.email}`);
            console.log(response);
            return response.data;

        },
    });

    console.log(payments);

    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Payment History</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Transaction Id</th>
                        <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                        <th className="border border-gray-300 px-4 py-2">Fees</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
                            <td className="border border-gray-300 px-4 py-2">{payment.campName}</td>
                            <td className="border border-gray-300 px-4 py-2">${payment.campFees}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <span className={
                                    payment.paymentStatus === "Paid"
                                        ? "text-green-600 font-semibold"
                                        : "text-red-600 font-semibold"
                                }>
                                    {payment.paymentStatus}
                                </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {payment.paymentConfirmationStatus}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default PaymentHistory;
