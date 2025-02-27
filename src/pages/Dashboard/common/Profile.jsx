import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { PhoneIcon, MapPinIcon, IdentificationIcon } from "@heroicons/react/24/solid";

const Profile = () => {
    const { user } = useAuth();
    const [getUser, setGetUser] = useState(null);
    const [role, setRole] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        phone: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://care-heaven-server.vercel.app/users/${user.email}`);
                const data = await response.json();

                setGetUser(data);
                setFormData({
                    name: data.displayName || "",
                    email: data.email || "",
                    image: data.photoURL || "",
                    phone: data.phone || "",
                    address: data.address || "",
                });
                setLoading(false);

                setRole(data.role || "User");
            } catch (err) {
                console.error("Error fetching user data:", err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://care-heaven-server.vercel.app/users/${formData.email}`,
                formData,
                { withCredentials: true }
            );

            if (response.data.success) {
                setIsEditing(false);
                Swal.fire({
                    title: "Profile updated successfully!",
                    icon: "success",
                    draggable: true,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error updating profile. Please try again.",
            });
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300 bg-white dark:bg-gray-800 p-6">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center transition-colors duration-300">
                <div className="relative flex justify-center -mt-16">
                    <img
                        src={getUser?.image}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                </div>
                <h1 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">{getUser?.name}</h1>
                <p className="text-md text-gray-600 dark:text-gray-300">{getUser?.email}</p>

                {/* Phone Number with Icon */}
                <div className="flex items-center justify-center mt-2 text-gray-600 dark:text-gray-300">
                    <PhoneIcon className="w-5 h-5 text-blue-500 mr-2" />
                    <span>{getUser?.phone || "Not Provided"}</span>
                </div>

                {/* Address with Icon */}
                <div className="flex items-center justify-center mt-2 text-gray-600 dark:text-gray-300">
                    <MapPinIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>{getUser?.address || "Not Provided"}</span>
                </div>

                {/* User ID */}
                <div className="flex items-center justify-center mt-3 text-gray-500 dark:text-gray-400 text-sm">
                    <IdentificationIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <span>User ID: {user.uid}</span>
                </div>

                <div className="mt-6">
                    <button
                        className="w-full py-2 px-4 rounded-full bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 transition-all duration-300"
                        onClick={() => setIsEditing(true)}
                    >
                        Update Profile
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Profile Picture URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
