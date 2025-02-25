import React from 'react';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {

    const { data: services = [], isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/services", {
                withCredentials: true,
            });
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="pt-24 pb-24 bg-gray-100 dark:bg-gray-900">
            <div className='lg:w-10/12 mx-auto w-11/12 '>
                <div className="text-center">
                    <p className="text-blue-600 dark:text-blue-300 font-bold mb-3">Our Services</p>
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
                        Comprehensive services for <br /> your health
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>

                <div className="text-center my-8">
                    <Link
                        to="/all-services"
                        className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-blue-500"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
