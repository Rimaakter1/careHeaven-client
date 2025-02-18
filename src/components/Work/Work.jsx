import React from 'react';
import workStep1 from '../../assets/work-step-img-1.jpg'
import workStep2 from '../../assets/work-step-img-2.jpg'
import workStep3 from '../../assets/work-step-img-3.jpg'
import workStep4 from '../../assets/work-step-img-4.jpg'

const Work = () => {
    return (
        <div className='lg:w-10/12 mx-auto w-11/12 mt-40'>
            <div className='text-center'>
                <p className='text-blue-600 font-bold mb-5'>  How We Work</p>
                <h1 className='text-3xl font-Parkinsans text-black mb-4 font-bold'>We work to achieve better <br />
                    health outcomes</h1>
                <p className='mb-10'>We are committed to improving health outcomes through personalized care, <br />
                    innovative treatments, and a focus on prevention.</p>
            </div>
            <div className='grid grid-cols-4 gap-10 mb-14'>
                <div>
                    <img className='rounded-full' src={workStep1} alt="" />
                </div>
                <div>
                    <img className='rounded-full' src={workStep2} alt="" />
                </div>
                <div>
                    <img className='rounded-full' src={workStep3} alt="" />
                </div>
                <div>
                    <img className='rounded-full' src={workStep4} alt="" />
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-4 gap-10 text-center'>
                <div className='flex flex-col -mt-5 items-center justify-center'>
                    <div className='bg-blue-600 rounded-full text-white flex items-center justify-center h-9 w-9 mb-2'>
                        <h4>01</h4>
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Create Account</h3>
                    <p className="text-gray-600">Sign up to access and manage medical camps easily.</p>


                </div>
                <div className='flex flex-col -mt-5 items-center justify-center'>
                    <div className='bg-blue-600 rounded-full text-white flex items-center justify-center h-9 w-9 mb-2'>
                        <h4>02</h4>
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Search Camps
                    </h3>
                    <p className="text-gray-600">Find medical camps based on your location and needs.</p>

                </div>
                <div className='flex flex-col -mt-5 items-center justify-center'>
                    <div className='bg-blue-600 rounded-full text-white flex items-center justify-center h-9 w-9 mb-2'>
                        <h4>03</h4>

                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Join Camp
                    </h3>
                    <p className="text-gray-600">Register and visit the camp for healthcare services.</p>


                </div>
                <div className='flex flex-col -mt-5 items-center justify-center'>
                    <div className='bg-blue-600 rounded-full text-white flex items-center justify-center h-9 w-9 mb-2'>
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