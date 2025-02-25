import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Swiper Core Modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loading from "../Loading/Loading";

const FeedbackAndRatings = () => {
    const { data: feedbacks = [], isLoading } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const response = await axios.get("https://care-heaven-server.vercel.app/feedbacks", {
                withCredentials: true,
            });
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="lg:py-40 w-11/12 md:w-10/12 mx-auto md:py-20 py-10">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 font-Parkinsans">
                Feedback and Ratings
            </h2>
            <p className="text-black font-Poppins text-center w-full md:w-11/12 lg:w-10/12 mx-auto mb-9">
                Our users' experiences matter to us. Here's what some of our valued participants have to say about our services. Explore their insightful feedback and see how we've made a positive impact. We're constantly striving to improve, and your feedback helps us get better.
            </p>

            {feedbacks.length > 0 ? (
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {feedbacks.map((feedback, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:border hover:border-blue-400 hover:border-dashed transition-shadow duration-300 max-w-xl mx-auto h-[400px] flex flex-col justify-between">
                                {feedback.photo && (
                                    <img
                                        src={feedback.photo}
                                        alt={`${feedback.participantName}'s profile`}
                                        className="h-20 w-20 rounded-full mx-auto mb-3 object-cover"
                                    />
                                )}

                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{feedback.participantName}</h3>
                                    <p className="text-sm text-gray-500">{feedback.participantEmail}</p>
                                </div>

                                <p className="text-gray-700 text-center italic overflow-hidden text-ellipsis line-clamp-3">
                                    "{feedback.feedback}"
                                </p>

                                <div className="flex justify-center items-center">
                                    <Rating
                                        initialRating={feedback.rating}
                                        readonly
                                        emptySymbol={<AiOutlineStar className="text-yellow-500 text-2xl" />}
                                        fullSymbol={<AiFillStar className="text-yellow-500 text-2xl" />}
                                    />
                                </div>

                                <p className="text-gray-500 text-xs text-center mt-2">
                                    Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-gray-500 text-center">No feedback available yet.</p>
            )}
        </section>
    );
};

export default FeedbackAndRatings;
