import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import useRole from "../../hooks/useRole";

const CampDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();
    const { campId } = useParams();
    const [role] = useRole()

    const { data: camp = {}, isLoading, refetch
    } = useQuery({
        queryKey: ["camp", campId],
        queryFn: async () => {
            const response = await axios.get(`https://care-heaven-server.vercel.app/camp/${campId}`, {
                withCredentials: true,
            });
            return response.data;
        },
    });

    const { register, handleSubmit, setValue } = useForm();
    React.useEffect(() => {
        if (camp) {
            setValue("campName", camp.name);
            setValue("campFees", camp.Fees);
            setValue("campLocation", camp.location);
            setValue("healthcareProfessional", camp.professionalName);
        }
    }, [camp, setValue]);

    const onSubmit = async (data) => {
        const participantData = {
            campId: camp._id,
            campName: camp.name,
            fees: camp.Fees,
            location: camp.location,
            professionalName: camp.professionalName,
            participantName: user.displayName,
            participantEmail: user.email,
            age: data.age,
            phone: data.phone,
            gender: data.gender,
            emergencyContact: data.emergencyContact,
            paymentStatus: 'unpaid',
            paymentConfirmationStatus: 'pending',
            feedback: 'N/A',

        };
        if (role !== "admin") {
            try {
                const response = await axios.post("https://care-heaven-server.vercel.app/participants", participantData, {
                    withCredentials: true,
                });
                refetch()
                if (response.status === 200) {
                    Swal.fire({
                        title: "Camp registration successful!",
                        icon: "success",
                        draggable: true
                    });


                    setShowModal(false);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Camp registration failed!",
                });
            }
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Admin cannot register in camp!",
            });
        }
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (!camp) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-xl font-bold text-red-600">Camp details not found!</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
            <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="mt-6">
                <h1 className="text-4xl font-extrabold text-gray-800">{camp.name}</h1>
                <p className="text-gray-700 text-base mt-4">{camp.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Fees</p>
                    <span className="text-lg font-bold text-blue-600">${camp.Fees}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Date & Time</p>
                    <span className="text-lg font-bold text-green-600">
                        {new Date(camp.time).toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Location</p>
                    <span className="text-lg font-bold text-purple-600">{camp.location}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Healthcare Professional</p>
                    <span className="text-lg font-bold text-indigo-600">
                        {camp.professionalName}
                    </span>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="font-semibold text-gray-600">Participants</p>
                    <span className="text-lg font-bold text-red-600">{camp.participantCount}</span>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-semibold text-lg rounded-md shadow-md transition-all">
                    Join Camp
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[60%] ">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                            Participant Registration
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <label className="font-semibold block">Camp Name:</label>
                                <input
                                    type="text"
                                    value={camp.name}
                                    disabled
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Camp Fees:</label>
                                <input
                                    type="number"
                                    value={camp.Fees}
                                    disabled
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Location:</label>
                                <input
                                    type="text"
                                    value={camp.location}
                                    disabled
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Healthcare Professional:</label>
                                <input
                                    type="text"
                                    value={camp.professionalName}
                                    disabled
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Your Name:</label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    disabled
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Your Email:</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Age:</label>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    {...register("age", { required: true })}
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Phone Number:</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    {...register("phone", { required: true })}
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block">Gender:</label>
                                <select
                                    {...register("gender", { required: true })}
                                    className="border p-2 rounded-md w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-semibold block">Emergency Contact:</label>
                                <input
                                    type="text"
                                    placeholder="Emergency Contact"
                                    {...register("emergencyContact", { required: true })}
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 col-span-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
        </div>
    );
};

export default CampDetails;
