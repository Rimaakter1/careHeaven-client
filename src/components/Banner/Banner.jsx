import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../assets/slider-1.webp";
import slide2 from "../../assets/slider-2.jpeg";
import slide3 from "../../assets/slider-3.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const Banner = () => {
    return (
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper mt-16"
        >
            <SwiperSlide className="relative">
                <div
                    className="h-[75vh] bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide1})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-2xl w-6/12 font-Parkinsans md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Empowering Communities
                        </h2>
                        <p className="text-sm md:text-lg font-DM_Serif_Text text-white w-3/4 lg:max-w-3xl mb-6">
                            Discover how our medical camps have transformed lives by providing
                            free healthcare services to those in need.
                        </p>
                        <button className="px-10 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md hover:opacity-90">
                            Join Us
                        </button>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide className="relative">
                <div
                    className="h-[75vh] bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide2})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-2xl w-6/12 font-Parkinsans md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Spreading Smiles
                        </h2>
                        <p className="text-sm font-DM_Serif_Text md:text-lg text-white w-3/4 lg:max-w-3xl mb-6">
                            Our initiatives focus on bringing healthcare to remote areas,
                            ensuring everyone has access to basic medical support.
                        </p>
                        <button className="px-10 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md hover:opacity-90">
                            Explore Now
                        </button>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide className="relative">
                <div
                    className="h-[75vh] bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide3})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-2xl w-6/12 font-Parkinsans md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Building a Healthier Future
                        </h2>
                        <p className="text-sm font-DM_Serif_Text md:text-lg text-white w-3/4 lg:max-w-3xl mb-6">
                            Join us in our journey to make healthcare accessible for
                            underprivileged communities worldwide.
                        </p>
                        <button className="px-10 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md hover:opacity-90">
                            See Camps
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;
