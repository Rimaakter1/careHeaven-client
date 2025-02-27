import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [imageName, setImageName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ["camp", id],
        queryFn: async () => {
            const response = await axios.get(`https://care-heaven-server.vercel.app/camp/${id}`, {
                withCredentials: true,
            });
            return response.data;
        },
    });

    useEffect(() => {
        if (camp.image) {
            setImageName(camp.image.split("/").pop());
            setImageUrl(camp.image);
        }

        if (camp) {
            setValue("campName", camp.name || "");
            setValue("campFees", camp.Fees || "");
            setValue("dateTime", camp.time || "");
            setValue("description", camp.Details || "");
            setValue("healthcareProfessional", camp.professionalName || "");
            setValue("location", camp.location || "");
        }
    }, [camp, setValue]);

    const onSubmit = async (data) => {
        try {
            let imageUrlToUpdate = imageUrl;

            if (data.image[0]) {
                const imageFile = { image: data.image[0] };
                const res = await axios.post(image_hosting_api, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });

                if (res.data.success) {
                    imageUrlToUpdate = res.data.data.display_url;
                }
            }

            const campData = {
                name: data.campName,
                Fees: parseFloat(data.campFees),
                time: data.dateTime,
                Details: data.description,
                professionalName: data.healthcareProfessional,
                location: data.location,
                image: imageUrlToUpdate,
            };

            const campRes = await axios.put(
                `https://care-heaven-server.vercel.app/update-camp/${id}`,
                campData,
                { withCredentials: true }
            );

            if (campRes.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Camp Updated Successfully",
                    icon: "success",
                    draggable: true
                });
                navigate('/dashboard/manage-camps')
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update camp. Please try again",
            });
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const newImage = e.target.files[0];
            setImageName(newImage.name);
            const newImageUrl = URL.createObjectURL(newImage);
            setImageUrl(newImageUrl);
        }
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg p-2 md:p-6 lg:p-10 border border-gray-300">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-blue-700">Update Health Camp</h1>
                <p className="mt-2 text-gray-600">Update the form below to make changes to the health camp details.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Camp Name</label>
                        <input
                            type="text"
                            {...register("campName", { required: "Camp Name is required" })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.campName && (
                            <span className="text-red-500 text-sm">{errors.campName.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Camp Image</label>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input w-full bg-white rounded-lg border border-gray-300"
                            onChange={handleImageChange}
                        />
                        <div className="mt-2 text-gray-600">
                            {imageName || "No file chosen"}
                        </div>
                        {imageUrl && !errors.image && (
                            <img src={imageUrl} alt="Selected Camp" className="mt-2 h-20 rounded-lg" />
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Camp Fees</label>
                        <input
                            type="number"
                            {...register("campFees", {
                                required: "Camp Fees is required",
                                min: { value: 0, message: "Fees must be at least 0" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.campFees && (
                            <span className="text-red-500 text-sm">{errors.campFees.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Date & Time</label>
                        <input
                            type="datetime-local"
                            {...register("dateTime", { required: "Date & Time is required" })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.dateTime && (
                            <span className="text-red-500 text-sm">{errors.dateTime.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            {...register("location", { required: "Location is required" })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.location && (
                            <span className="text-red-500 text-sm">{errors.location.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Healthcare Professional Name
                        </label>
                        <input
                            type="text"
                            {...register("healthcareProfessional", {
                                required: "Healthcare Professional Name is required",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.healthcareProfessional && (
                            <span className="text-red-500 text-sm">{errors.healthcareProfessional.message}</span>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            {...register("description", {
                                required: "Description is required",
                                minLength: { value: 10, message: "Description must be at least 10 characters" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        ></textarea>
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description.message}</span>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        Update Camp
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCamp;
