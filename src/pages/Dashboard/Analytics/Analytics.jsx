import React from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading/Loading';

const Analytics = () => {
    const { user } = useAuth();
    const { data: registeredCamps = [], isLoading } = useQuery({
        queryKey: ["registeredCamps"],
        queryFn: async () => {
            const response = await axios.get(
                `https://care-heaven-server.vercel.app/participant-all-camps/${user.email}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="dark:bg-gray-900 dark:text-white min-h-screen py-8">
            <div className="w-full md:w-11/12 lg:w-10/12 mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">Analytics</h2>

                {registeredCamps.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300">No camps registered yet.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={registeredCamps}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />

                            <XAxis
                                dataKey="campName"
                                className="dark:text-white"
                                tick={{ className: "dark:fill-white" }}
                            />
                            <YAxis className="dark:text-white" tick={{ className: "dark:fill-white" }} />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                                wrapperClassName="dark:bg-gray-800 dark:text-white"
                            />

                            <Legend wrapperStyle={{ color: 'black' }} className="dark:text-white" />

                            <Bar dataKey="fees" fill="#4F46E5" />
                            <Bar dataKey="location" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Analytics;
