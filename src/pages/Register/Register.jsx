import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import registerImage from '../../assets/registerBg.webp';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
    const navigate = useNavigation()
    const onSubmit = async (data) => {
        try {
            await createUser(data.email, data.password);
            await updateUserProfile(data.displayName, data.photoUrl);
            await axios.post(`http://localhost:5000/users/${data?.email}`, {
                name: data?.displayName,
                image: data?.photoURL,
                email: data?.email,
            })

            Swal.fire({
                title: "Registration successful!",
                icon: "success",
                draggable: true
            });
            navigate('/')
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Registration failed. Please try again.",
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const data = await signInWithGoogle();
            await axios.post(`http://localhost:5000/users/${data?.user?.email}`, {
                name: data?.user?.displayName,
                image: data?.user?.photoURL,
                email: data?.user?.email,
            })
            Swal.fire({
                title: "Google login successful!",
                icon: "success",
                draggable: true
            });
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Google login failed",
            });
        }
    };

    return (
        <div className='bg-gray-100'>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-10/12 mx-auto py-8 ">
                <div className="flex flex-col justify-center items-start">
                    <div className="w-full bg-white shadow-md rounded-md p-6">
                        <h2 className="text-3xl font-bold mb-6 text-left">Register</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                {...register("displayName", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full"
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
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full"
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
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch('password') || "Passwords don't match"
                                })}
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full"
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
                                className="p-3 border rounded-md focus:outline-none focus:ring w-full"
                            />
                            {errors.photoUrl && <span className="text-red-500 text-sm">{errors.photoUrl.message}</span>}

                            <button type="submit" className="bg-blue-500 text-white py-3 rounded-md font-semibold w-full">
                                Register
                            </button>
                        </form>

                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center space-x-2 mt-4 bg-blue-950 text-white py-3 rounded-md w-full font-semibold"
                        >
                            <FcGoogle /> <span>Register with Google</span>
                        </button>

                        <p className="mt-4 text-sm text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 underline">Login</Link>
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
