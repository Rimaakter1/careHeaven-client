import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddACamp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const imageFile = { image: data.image[0] }
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const campData = {
                    name: data.campName,
                    Fees: data.campFees,
                    time: data.dateTime,
                    Details: data.description,
                    professionalName: data.healthcareProfessional,
                    location: data.location,
                    image: res.data.data.display_url
                }
                const campRes = await axios.post("http://localhost:5000/camps", { ...campData, participantCount: 0 }, {
                    withCredentials: true,
                });
                // if (campRes.data.insert) {
                //     alert("Camp added successfully!");
                // }
            }

        } catch (error) {
            console.error("Error adding camp:", error);
            alert("Failed to add camp. Please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-semibold text-gray-700 mb-5">Add A Camp</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Camp Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Camp Name</label>
                    <input
                        type="text"
                        {...register("campName", { required: "Camp Name is required" })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.campName && <span className="text-red-500 text-sm">{errors.campName.message}</span>}
                </div>

                <div className="form-control w-full my-6">
                    <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>

                {/* Camp Fees */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Camp Fees</label>
                    <input
                        type="number"
                        {...register("campFees", {
                            required: "Camp Fees is required",
                            min: { value: 0, message: "Fees must be at least 0" },
                        })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.campFees && <span className="text-red-500 text-sm">{errors.campFees.message}</span>}
                </div>

                {/* Date & Time */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                    <input
                        type="datetime-local"
                        {...register("dateTime", { required: "Date & Time is required" })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.dateTime && <span className="text-red-500 text-sm">{errors.dateTime.message}</span>}
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        {...register("location", { required: "Location is required" })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                </div>

                {/* Healthcare Professional Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Healthcare Professional Name</label>
                    <input
                        type="text"
                        {...register("healthcareProfessional", { required: "Healthcare Professional Name is required" })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.healthcareProfessional && (
                        <span className="text-red-500 text-sm">{errors.healthcareProfessional.message}</span>
                    )}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                            minLength: { value: 10, message: "Description must be at least 10 characters" },
                        })}
                        className="w-full p-2 border rounded-md"
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Camp
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddACamp;
