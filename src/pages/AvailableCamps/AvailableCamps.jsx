import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CampCard from "../../components/CampCard/CampCard";
import Loading from "../../components/Loading/Loading";

const AvailableCamps = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortCriteria, setSortCriteria] = useState("");
    const [isTwoColumn, setIsTwoColumn] = useState(false);

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ["AvailableCamps"],
        queryFn: async () => {
            const response = await axios.get("https://care-heaven-server.vercel.app/camps");
            return response.data;
        },
    });

    const filteredCamps = camps
        .filter((camp) =>
            camp.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortCriteria === "Most Registered") {
                return b.participantCount - a.participantCount;
            }
            if (sortCriteria === "Camp Fees") {
                return a.Fees - b.Fees;
            }
            if (sortCriteria === "Alphabetical") {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <section className="bg-gray-50 py-12 px-4 md:px-16 lg:px-32">
            <header className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-700">Explore Our Available Medical Camps</h2>
                <p className="text-gray-600 w-9/12 mx-auto mt-4">
                    Discover medical camps tailored for diverse health needs, offering expert care, accessible
                    locations, and affordable fees. Browse now to secure your spot for quality healthcare!
                </p>
            </header>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search camps by name..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="Most Registered">Most Registered</option>
                    <option value="Camp Fees">Camp Fees</option>
                    <option value="Alphabetical">Alphabetical (Camp Name)</option>
                </select>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => setIsTwoColumn((prev) => !prev)}
                >
                    {isTwoColumn ? "Switch to Three-Column" : "Switch to Two-Column"}
                </button>
            </div>

            <div
                className={`grid gap-8 ${isTwoColumn ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
            >
                {filteredCamps.map((camp) => (
                    <CampCard key={camp._id} camp={camp} />
                ))}
            </div>
        </section>
    );
};

export default AvailableCamps;
