import React from 'react';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Work from '../../components/Work/Work';
import FeedbackAndRatings from '../../components/FeedbacksAndRatings/FeedbackAndRatings';

const AllServices = () => {

    const { data: allServices = [], isLoading } = useQuery({
        queryKey: ["allServices"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/all-services", {
                withCredentials: true,
            });
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }


    return (
        <div className='mt-12 mb-44 '>
            <div className='lg:w-10/12 w-11/12 mx-auto '>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold font-Parkinsans text-black'>Comprehensive Healthcare, <br /> Anytime You Need</h1>
                    <p className='text-gray-400 mt-5'>Our medical camp provides a full range of healthcare services, ensuring  accessible and reliable treatment <br /> for everyone. Whether you need preventive care, expert consultations, or emergency support, our dedicated team is here to help. </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {allServices.map((service) => (
                        <ServiceCard service={service}></ServiceCard>
                    ))}
                </div>
            </div>

            <Work></Work>
            <FeedbackAndRatings></FeedbackAndRatings>
        </div>
    );
};

export default AllServices;