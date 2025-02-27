import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import registerImage from '../../assets/registerBg.webp';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            const data = await signInWithGoogle();
            const response = await axios.post(`https://care-heaven-server.vercel.app/users/${data?.user?.email}`, {
                name: data?.user?.displayName,
                image: data?.user?.photoURL,
                email: data?.user?.email,
                withCredential: true,
            });
            if (response.status === 200) {
                Swal.fire({
                    title: response.data.message || "Welcome back!",
                    icon: "success",
                    draggable: true,
                });
                navigate('/')
            } else if (response.status === 201) {
                Swal.fire({
                    title: response.data.message || "Google login successful!",
                    icon: "success",
                    draggable: true,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.message || "Google login failed. Please try again.",
            });
        }
    };

    const onSubmit = async (data) => {
        try {
            await createUser(data.email, data.password);
            await updateUserProfile(data.displayName, data.photoUrl);

            const response = await axios.post(`https://care-heaven-server.vercel.app/users/${data.email}`, {
                name: data.displayName,
                image: data.photoUrl,
                email: data.email,
            });
            navigate('/');
            Swal.fire({
                title: response.data.message || "Registration successful!",
                icon: "success",
                draggable: true,
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Registration failed. Please try again.",
            });

        }
    };

    return (
        <div className='bg-gray-100 dark:bg-gray-700 mt-20'>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-10/12 mx-auto py-8">
                <div className="flex flex-col justify-center items-start">
                    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-l-md p-6">
                        <h2 className="text-3xl font-bold mb-6 text-left text-gray-900 dark:text-white">Register</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                {...register("displayName", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            {errors.displayName && <span className="text-red-500 text-sm">{errors.displayName.message}</span>}

                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                    }
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch('password') || "Passwords don't match"
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

                            <input
                                type="url"
                                placeholder="Profile Picture URL"
                                {...register("photoUrl", {
                                    required: "Profile picture URL is required",
                                    pattern: {
                                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                        message: "Invalid URL"
                                    }
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            {errors.photoUrl && <span className="text-red-500 text-sm">{errors.photoUrl.message}</span>}

                            <button type="submit" className="bg-blue-500 text-white py-3 rounded-md font-semibold w-full dark:bg-blue-700 dark:hover:bg-blue-600">
                                Register
                            </button>
                        </form>

                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center space-x-2 mt-4 bg-blue-950 text-white py-3 rounded-md w-full font-semibold dark:bg-blue-800 dark:hover:bg-blue-700"
                        >
                            <FcGoogle /> <span>Register with Google</span>
                        </button>

                        <p className="mt-4 text-sm text-center text-gray-900 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 underline dark:text-blue-400 dark:hover:text-blue-500">Login</Link>
                        </p>
                    </div>
                </div>

                <div
                    className="hidden md:block object-cover bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${registerImage})`
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Register;
