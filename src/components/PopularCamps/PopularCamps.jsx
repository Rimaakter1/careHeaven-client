import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CampCard from "../CampCard/CampCard";

const PopularCamps = () => {
    const navigate = useNavigate();

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ["popularCamps"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/camps?sort=participants&order=desc&limit=6");
            return response.data;
        },
    });

    const handleViewAll = () => {
        navigate("/available-camps");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="bg-gray-50 py-12 px-4 md:px-16 lg:px-32">
            <header className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-700">Popular Medical Camps</h2>
                <p className="mt-2 text-gray-600">Explore the most attended medical camps hosted by renowned professionals.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.map((camp) => (
                    <CampCard key={camp.id} camp={camp}></CampCard>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={handleViewAll}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                    See All Camps
                </button>
            </div>
        </section>
    );
};

export default PopularCamps;
