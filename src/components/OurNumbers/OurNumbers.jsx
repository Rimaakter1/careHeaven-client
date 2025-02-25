import React from "react";
import { FaUserMd, FaClinicMedical, FaUsers, FaHeartbeat, FaCity, FaBriefcaseMedical } from "react-icons/fa";

const stats = [
    { id: 1, icon: <FaUserMd size={30} />, title: "Patients Treated", value: "50,000+" },
    { id: 2, icon: <FaClinicMedical size={30} />, title: "Camps Organized", value: "1,200+" },
    { id: 3, icon: <FaUsers size={30} />, title: "Medical Volunteers", value: "500+" },
    { id: 4, icon: <FaHeartbeat size={30} />, title: "Successful Treatments", value: "98%" },
    { id: 5, icon: <FaCity size={30} />, title: "Cities Covered", value: "30+" },
    { id: 6, icon: <FaBriefcaseMedical size={30} />, title: "Free Health Checkups", value: "10,000+" },
];

const OurNumbers = () => {
    return (
        <div className="  py-20 bg-white dark:bg-gray-800">
            <div className="lg:w-10/12 mx-auto w-11/12 text-center">
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-3">Our Numbers</p>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-5">
                    By the numbers: <br /> excellence in health
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-14">
                    Excellence in healthcare is our standard, and our numbers back it up. From patient satisfaction <br /> rates to successful treatment outcomes, we are committed to making a difference.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 p-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={stat.id} className="flex flex-col items-center text-center">
                            <div
                                className={`w-32 h-32 flex flex-col justify-center items-center 
                            rounded-full shadow-lg transition-all duration-300 
                            ${index % 2 === 0
                                        ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                                        : "border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white dark:bg-gray-800 lg:-mt-10 mt-0"}
                        `}
                            >
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <p className="text-sm">{stat.title}</p>
                            </div>
                            <div className="mt-3 text-gray-600 dark:text-gray-300 text-xl">{stat.icon}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurNumbers;
