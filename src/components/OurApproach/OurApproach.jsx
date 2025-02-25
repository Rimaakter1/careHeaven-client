import React, { useState } from 'react';
import ourApproach from '../../assets/our-approach-img.jpg';
import missionImg from '../../assets/mission-image.jpg';
import { TiTick } from 'react-icons/ti';

const OurApproach = () => {
    const [activeTab, setActiveTab] = useState("vision");

    const content = {
        vision: {
            points: [
                "Quality healthcare for all.",
                "Wellness through innovation.",
                "Compassion at every step.",
                "Building a healthier future.",
            ],
        },
        mission: {
            points: [
                "Personalized treatment plans.",
                "Advanced medical technology.",
                "Community-driven healthcare.",
                "Commitment to patient safety.",
            ],
        },
        value: {
            points: [
                "Ethical services.",
                "Continuous improvement.",
                "Diversity in healthcare.",
                "Respect for every individual.",
            ],
        }
    };

    return (
        <div className='py-20 bg-gray-100 dark:bg-gray-800'>
            <div className='w-11/12 mx-auto max-w-6xl'>
                <div className='flex flex-col lg:flex-row gap-8 items-center'>
                    <div className='lg:w-1/2 w-full'>
                        <img className='rounded-3xl w-full h-auto' src={ourApproach} alt="Our Approach" />
                    </div>

                    <div className='lg:w-1/2 w-full text-center lg:text-left'>
                        <p className='text-blue-400 dark:text-blue-300 font-bold mb-4'>Our Approach</p>
                        <h1 className='text-black dark:text-white font-bold text-3xl md:text-4xl mb-4 leading-snug'>
                            Providing Personalized Healthcare
                        </h1>
                        <p className='text-gray-700 dark:text-gray-300 text-sm md:text-base'>
                            We focus on personalized care to meet your unique needs, combining innovation and compassion for a truly patient-centered approach.
                        </p>

                        <div className='my-8 flex flex-wrap justify-center lg:justify-start gap-3'>
                            {["vision", "mission", "value"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`rounded-3xl px-5 py-2 font-bold transition-all text-sm md:text-base ${activeTab === tab
                                        ? "bg-blue-400 text-white"
                                        : "bg-white hover:bg-blue-400 hover:text-white dark:bg-gray-700 dark:hover:bg-blue-500 dark:text-white"
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "vision" ? "Our Vision" : tab === "mission" ? "Our Mission" : "Our Value"}
                                </button>
                            ))}
                        </div>

                        <div className='flex flex-col md:flex-row items-center gap-4'>
                            <div className='md:w-1/2 w-full'>
                                <img className='rounded-3xl w-full h-auto' src={missionImg} alt="Mission" />
                            </div>
                            <div className='md:w-1/2 w-full space-y-4'>
                                {content[activeTab].points.map((point, index) => (
                                    <div key={index} className='flex items-center  justify-start'>
                                        <div className="w-6 h-6 flex items-center justify-center bg-blue-800 dark:bg-blue-600 rounded-full text-white">
                                            <TiTick size={14} />
                                        </div>
                                        <p className='ml-2 text-gray-800 dark:text-gray-200 text-sm md:text-base'>{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurApproach;
