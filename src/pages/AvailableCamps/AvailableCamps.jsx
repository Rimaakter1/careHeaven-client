import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CampCard from "../../components/CampCard/CampCard";

const AvailableCamps = () => {
    const navigate = useNavigate();

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ["AvailableCamps"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/camps");
            return response.data;
        },
    });

    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="bg-gray-50 py-12 px-4 md:px-16 lg:px-32">
            <header className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-700">Explore Our Available Medical Camps

                </h2>
                <p className=" text-gray-600 w-9/12 mx-auto mt-4">Discover medical camps tailored for diverse health needs, offering expert care, accessible locations, and affordable fees. Browse now to secure your spot for quality healthcare!
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.map((camp) => (
                    <CampCard key={camp.id} camp={camp}></CampCard>
                ))}
            </div>


        </section>
    );
};

export default AvailableCamps;
