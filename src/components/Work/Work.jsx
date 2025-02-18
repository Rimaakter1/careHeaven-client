import React from 'react';
import workStep1 from '../../assets/work-step-img-1.jpg';
import workStep2 from '../../assets/work-step-img-2.jpg';
import workStep3 from '../../assets/work-step-img-3.jpg';
import workStep4 from '../../assets/work-step-img-4.jpg';

const Work = () => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-20'>
            <div className='text-center'>
                <p className='text-blue-600 font-bold mb-3'>How We Work</p>
                <h1 className='text-3xl font-bold text-black mb-4 leading-tight'>
                    We work to achieve better <br className='hidden md:block' />
                    health outcomes
                </h1>
                <p className='mb-8 text-gray-600'>
                    We are committed to improving health outcomes through personalized care, <br className='hidden md:block' />
                    innovative treatments, and a focus on prevention.
                </p>
            </div>

            <div className='lg:grid grid-cols-4 gap-6 mb-10 hidden'>
                <div className="flex justify-center">
                    <img className='rounded-full w-24 sm:w-32 md:w-40' src={workStep1} alt="" />
                </div>
                <div className="flex justify-center">
                    <img className='rounded-full w-24 sm:w-32 md:w-40' src={workStep2} alt="" />
                </div>
                <div className="flex justify-center">
                    <img className='rounded-full w-24 sm:w-32 md:w-40' src={workStep3} alt="" />
                </div>
                <div className="flex justify-center">
                    <img className='rounded-full w-24 sm:w-32 md:w-40' src={workStep4} alt="" />
                </div>
            </div>

            <hr className='my-6' />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-blue-600 text-white rounded-full flex items-center justify-center h-10 w-10 mb-3 text-lg font-semibold lg:-mt-12 md:mt-0'>
                        <h4>01</h4>
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Create Account</h3>
                    <p className="text-gray-600">Sign up to access and manage medical camps easily.</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-blue-600 text-white rounded-full flex items-center justify-center h-10 w-10 mb-3 text-lg font-semibold lg:-mt-12 md:mt-0'>
                        <h4>02</h4>
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Search Camps</h3>
                    <p className="text-gray-600">Find medical camps based on your location and needs.</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-blue-600 text-white rounded-full flex items-center justify-center h-10 w-10 mb-3 text-lg font-semibold lg:-mt-12 md:mt-0'>
                        <h4>03</h4>
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Join Camp</h3>
                    <p className="text-gray-600">Register and visit the camp for healthcare services.</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-blue-600 text-white rounded-full flex items-center justify-center h-10 w-10 mb-3 text-lg font-semibold lg:-mt-12 md:mt-0'>
                        <h4>04</h4>
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Receive Treatment</h3>
                    <p className="text-gray-600">Get medical care, treatment, and health advice.</p>
                </div>
            </div>
        </div>
    );
};

export default Work;
