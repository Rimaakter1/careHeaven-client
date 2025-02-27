import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["paymentHistory", user.email],
        queryFn: async () => {
            const response = await axios.get(`https://care-heaven-server.vercel.app/payments/${user.email}`);
            return response.data;
        },
    });

    const filteredPayments = payments.filter((payment) => {
        const query = searchQuery.toLowerCase();
        return (
            payment.transactionId.toLowerCase().includes(query) ||
            payment.campName.toLowerCase().includes(query) ||
            payment.paymentStatus.toLowerCase().includes(query)
        );
    });

    const indexOfLastPayment = currentPage * rowsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - rowsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
            <section className="py-8 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Payment History</h1>

                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Transaction Id</th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Camp Name</th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fees</th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Payment Status</th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPayments.map((payment) => (
                            <tr key={payment._id} className="text-center">
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{payment.transactionId}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{payment.campName}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">${payment.campFees}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                    <span
                                        className={
                                            payment.paymentStatus === "Paid"
                                                ? "text-green-600 dark:text-green-400 font-semibold"
                                                : "text-red-600 dark:text-red-400 font-semibold"
                                        }
                                    >
                                        {payment.paymentStatus}
                                    </span>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                    {payment.paymentConfirmationStatus}
                                </td>
                            </tr>
                        ))}
                        {filteredPayments.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500 dark:text-gray-400">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="btn btn-sm mr-2 bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="font-semibold dark:text-gray-300">{`Page ${currentPage}`}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="btn btn-sm ml-2 bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        disabled={currentPage * rowsPerPage >= filteredPayments.length}
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PaymentHistory;
