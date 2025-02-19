import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div key={service.id} className="bg-white p-6 shadow-lg rounded-3xl flex flex-col items-center text-center">
            <div>
                <div className='flex items-center my-2'>
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                </div>
                <hr />
                <p className="text-gray-600 my-4">{service.description}</p>
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-3" />
            </div>
        </div>
    );
};

export default ServiceCard;