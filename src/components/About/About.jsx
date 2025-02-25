import { TiTickOutline } from "react-icons/ti";
import aboutImg from "../../assets/tst.jpg";
import aboutImg2 from "../../assets/tst2.jpg";
import aboutImg3 from "../../assets/tst3.jpg";

const About = () => {
    return (
        <div className=" py-14 md:py-20 lg:py-36 dark:bg-gray-900">
            <div className="w-10/12 mx-auto">
                <p className="text-[#2949FF] font-Parkinsans text-lg font-bold">About Information</p>
                <div>
                    <h1 className="font-bold font-Parkinsans text-4xl lg:text-6xl text-black dark:text-white">
                        Every patient is different, <br /> every smile is unique
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 md:mt-8 lg:mt-12">
                    <div>
                        <div className="flex items-center mt-5 gap-2">
                            <div className="border rounded-full border-blue-600 p-1">
                                <div className="border rounded-full border-blue-600">
                                    <TiTickOutline className="text-4xl text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-black dark:text-white">Safety First</h4>
                            </div>
                        </div>
                        <p className="text-gray-500 w-9/12 ml-14 text-lg font-Poppins mt-2 dark:text-gray-300">
                            We prioritize safety with health checks, contactless check-in, enhanced PPE, and more.
                        </p>

                        <div className="flex items-center mt-5 gap-2">
                            <div className="border rounded-full border-blue-600 p-1">
                                <div className="border rounded-full border-blue-600">
                                    <TiTickOutline className="text-4xl text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-black dark:text-white">Insurance Accepted</h4>
                            </div>
                        </div>
                        <p className="text-gray-500 w-9/12 ml-14 text-lg font-Poppins mt-2 dark:text-gray-300">
                            We accept a wide range of insurance plans to ensure that our patients receive the highest quality care without the stress of managing payments.
                        </p>

                        <div className="flex items-center mt-5 gap-2">
                            <div className="border rounded-full border-blue-600 p-1">
                                <div className="border rounded-full border-blue-600">
                                    <TiTickOutline className="text-4xl text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-black dark:text-white">Trusted Team</h4>
                            </div>
                        </div>
                        <p className="text-gray-500 w-9/12 ml-14 text-lg font-Poppins mt-2 dark:text-gray-300">
                            At the heart of our practice is a team of dedicated and skilled professionals committed to providing exceptional care.
                        </p>
                    </div>

                    <div className="relative mt-4">
                        <img className="rounded-lg" src={aboutImg} alt="About Image" />
                        <img className="absolute -mt-20 ml-48 z-10 hidden lg:block rounded-lg" src={aboutImg2} alt="About Image 2" />
                        <img className="mt-20 hidden lg:block rounded-lg" src={aboutImg3} alt="About Image 3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
