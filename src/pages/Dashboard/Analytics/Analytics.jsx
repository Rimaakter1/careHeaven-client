import React, { useState, useEffect } from 'react';
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
        return <Loading></Loading>;
    }

    return (
        <div className="analytics-container w-full md:w-11/12 lg:w-10/12 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6"> Analytics</h2>

            {registeredCamps.length === 0 ? (
                <p>No camps registered yet.</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={registeredCamps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="campName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="fees" fill="#8884d8" />
                        <Bar dataKey="location" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Analytics;
