import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const Profile = () => {
    const { user, loading, setUser } = useAuth();
    const [role, isLoading] = useRole();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        image: user?.photoURL || "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://care-heaven-server.vercel.app/users/${user.email}`,
                formData,
                { withCredentials: true }
            );

            if (response.data.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: formData.name,
                    photoURL: formData.image,
                    email: formData.email,
                }));
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

    if (loading || isLoading) return <Loading />;

    return (
        <div className="dark:bg-gray-800 min-h-screen flex flex-col items-center p-6 transition-colors duration-300">
            <div className="w-full lg:w-6/12 bg-white dark:bg-gray-700 rounded-lg shadow-xl transition-colors duration-300">
                <div className="flex mt-14 justify-center">
                    <img
                        src={user?.photoURL}
                        alt="profile"
                        className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-700 shadow-md object-cover"
                    />
                </div>
                <div className="mt-5 px-6 pb-6 text-center">
                    <span className="bg-green-500 text-white text-sm font-medium rounded-full px-4 py-1">
                        {role}
                    </span>
                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        {user.displayName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">User ID: {user.uid}</p>

                    <div className="mt-6">
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
                            onClick={() => setIsEditing(true)}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl transition-colors duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Edit Profile</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Profile Picture URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
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
