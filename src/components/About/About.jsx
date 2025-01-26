import { TiTickOutline } from "react-icons/ti";
import aboutImg from "../../assets/tst.jpg";
import aboutImg2 from "../../assets/tst2.jpg";
import aboutImg3 from "../../assets/tst3.jpg";

const About = () => {
    return (
        <div className="w-10/12 mx-auto gap-8 my-14 md:my-20 lg:my-36">
            <p className="text-[#2949FF] font-Parkinsans text-lg font-bold">About Information</p>
            <div>
                <h1 className="font-bold font-Parkinsans text-4xl lg:text-6xl text-black">Every patient is different, <br /> every smile is unique</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 md:mt-8 lg:mt-12">
                <div>
                    <div>
                        <div className="flex items-center mt-5 gap-2">
                            <div className="border rounded-full border-blue-600 p-1">
                                <div className="border rounded-full border-blue-600">
                                    <TiTickOutline className="text-4xl text-blue-600"></TiTickOutline>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-black">Safety First</h4>

                            </div>

                        </div>
                        <p className="text-gray-500 w-9/12 ml-14 text-lg font-Poppins mt-2">We prioritize safety with health checks, contactless check-in, enhanced PPE, and more.</p>
                    </div>
                    <div>
                        <div className="flex items-center mt-5 gap-2">
                            <div className="border rounded-full border-blue-600 p-1">
                                <div className="border rounded-full border-blue-600">
                                    <TiTickOutline className="text-4xl text-blue-600"></TiTickOutline>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-black">Insurance Accepted</h4>

                            </div>

                        </div>
                        <p className="text-gray-500 w-9/12 ml-14 text-lg font-Poppins mt-2">We accept a wide range of insurance plans to ensure that our patients receive the highest quality care without the stress of managing payments. </p>
                    </div>
                    <div>
                        <div className="flex items-center mt-5 gap-2">
                            <div className="border rounded-full border-blue-600 p-1">
                                <div className="border rounded-full border-blue-600">
                                    <TiTickOutline className="text-4xl text-blue-600"></TiTickOutline>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-black">Trusted Team</h4>

                            </div>

                        </div>
                        <p className="text-gray-500 w-9/12 ml-14 text-lg font-Poppins mt-2">At the heart of our practice is a team of dedicated and skilled professionals committed to providing exceptional care.</p>
                    </div>
                </div>
                <div className=" relative mt-4">
                    <img src={aboutImg} alt="" />
                    <img className="absolute -mt-20 ml-64 z-10 hidden lg:block" src={aboutImg2} alt="" />
                    <img className="mt-20 hidden lg:block" src={aboutImg3} alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;