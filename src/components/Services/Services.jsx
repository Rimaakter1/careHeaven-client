import React from 'react';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div className="lg:w-10/12 mx-auto w-11/12 mt-20">
            <div className="text-center">
                <p className="text-blue-600 font-bold mb-3">Our Services</p>
                <h1 className="text-3xl font-bold text-black mb-5">
                    Comprehensive services for <br /> your health
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center text-center">
                        <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-3" />
                        <div className="text-4xl mb-3">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-5">
                <Link
                    to="/all-services"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    View All Services
                </Link>
            </div>
        </div>
    );
};

export default Services;
