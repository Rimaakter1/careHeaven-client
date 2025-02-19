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
        <div className='mt-20 py-20 bg-gray-100'>
            <div className='flex gap-8 lg:w-10/12 w-11/12 mx-auto'>
                <div className='lg:w-1/2 w-full mt-12'>
                    <img className='rounded-3xl' src={ourApproach} alt="Our Approach" />
                </div>

                <div className='lg:w-1/2 w-full'>
                    <p className='text-blue-400 font-bold mb-4'>Our Approach</p>
                    <h1 className='text-black font-bold text-4xl mb-4'>Providing personalized healthcare</h1>
                    <p>We focus on personalized care to meet your unique needs, combining innovation and compassion for a truly patient-centered approach.</p>

                    <div className='my-8 flex flex-row gap-4'>
                        <button
                            className={`rounded-3xl px-4 py-2 font-bold transition-all ${activeTab === "vision" ? "bg-blue-400 text-white" : "bg-white hover:bg-blue-400 hover:text-white"
                                }`}
                            onClick={() => setActiveTab("vision")}
                        >
                            Our Vision
                        </button>
                        <button
                            className={`rounded-3xl px-4 py-2 font-bold transition-all ${activeTab === "mission" ? "bg-blue-400 text-white" : "bg-white hover:bg-blue-400 hover:text-white"
                                }`}
                            onClick={() => setActiveTab("mission")}
                        >
                            Our Mission
                        </button>
                        <button
                            className={`rounded-3xl px-4 py-2 font-bold transition-all ${activeTab === "value" ? "bg-blue-400 text-white" : "bg-white hover:bg-blue-400 hover:text-white"
                                }`}
                            onClick={() => setActiveTab("value")}
                        >
                            Our Value
                        </button>
                    </div>

                    <div className='flex gap-2'>
                        <div className='w-1/2'>
                            <img className='rounded-3xl' src={missionImg} alt="Mission" />
                        </div>
                        <div className='w-1/2 space-y-4'>
                            
                            {content[activeTab].points.map((point, index) => (
                                <div key={index} className='flex items-center'>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-800 rounded-full text-white">
                                        <TiTick size={14} />
                                    </div>
                                    <p className='ml-2'>{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurApproach;
