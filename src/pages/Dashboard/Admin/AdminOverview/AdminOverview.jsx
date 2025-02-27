import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const AdminOverview = ({ darkMode }) => {
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/admin/stats', {
                withCredentials: true,
            });
            return response.data;
        },
    });

    if (statsLoading) {
        return (
            <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="text-center text-lg">Loading...</div>
            </div>
        );
    }

    const barData = {
        labels: ['Camp 1', 'Camp 2', 'Camp 3'],
        datasets: [
            {
                label: 'Participants',
                data: [stats.totalParticipants, 100, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Paid', 'Pending'],
        datasets: [
            {
                data: [stats.totalPayments, 50],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white dark:bg-gray-800 text-gray-900'}`}>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Admin Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Total Participants per Camp</h3>
                    <Bar data={barData} options={{ responsive: true }} />
                </div>
                <div className="bg-white dark:text-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Payment Status</h3>
                    <Pie data={pieData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
