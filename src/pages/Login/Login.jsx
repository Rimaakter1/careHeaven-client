import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import loginBackground from '../../assets/loginBg.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            Swal.fire({
                title: "Login Successful",
                icon: "success",
                draggable: true
            });
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login failed. Please check your credentials.",
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const data = await signInWithGoogle();
            await axios.post(`https://care-heaven-server.vercel.app/users/${data?.user?.email}`, {
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
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:py-12 md:py-6 py-4 min-h-screen bg-cover bg-center dark:bg-gray-900"
            style={{
                backgroundImage: `url(${loginBackground})`,
            }}
        >
            <div className="flex flex-col justify-center items-center md:items-start p-6 bg-white bg-opacity-90 mt-10 dark:bg-gray-800 dark:bg-opacity-90 shadow-lg md:max-w-md mx-auto md:w-full rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left text-gray-900 dark:text-white">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold w-full transition dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center space-x-2 mt-4 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-semibold w-full transition dark:bg-blue-800 dark:hover:bg-blue-700"
                >
                    <FcGoogle /> <span>Login with Google</span>
                </button>

                <p className="mt-4 text-sm text-center text-gray-900 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
