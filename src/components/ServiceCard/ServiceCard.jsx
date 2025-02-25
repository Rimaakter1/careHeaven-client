import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div key={service.id} className="bg-white dark:bg-gray-800 p-6 shadow-lg dark:shadow-xl rounded-3xl flex flex-col items-center text-center">
            <div>
                <div className='flex items-center my-2'>
                    <div className="text-4xl mb-3 text-blue-600 dark:text-blue-400">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{service.title}</h3>
                </div>
                <hr className="border-gray-300 dark:border-gray-600" />
                <p className="text-gray-600 dark:text-gray-300 my-4">{service.description}</p>
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-3" />
            </div>
        </div>
    );
};

export default ServiceCard;
