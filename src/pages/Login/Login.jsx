import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import loginBackground from '../../assets/loginBg.jpg';
import axios from 'axios';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, signInWithGoogle } = useAuth();

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            alert("Login successful!");
        } catch (error) {
            console.error(error.message);
            alert("Login failed. Please check your credentials.");
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
            alert("Google login successful!");
        } catch (error) {
            console.error(error.message);
            alert("Google login failed.");
        }
    };

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:py-12 md:py-6 py-4 min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${loginBackground})`,
            }}
        >
            <div className="flex flex-col justify-center items-center md:items-start p-6 bg-white bg-opacity-90 shadow-lg md:max-w-md mx-auto md:w-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-full"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-full"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold w-full transition"
                    >
                        Login
                    </button>
                </form>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center space-x-2 mt-4 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-semibold w-full transition"
                >
                    <FcGoogle /> <span>Login with Google</span>
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline hover:text-blue-600">Register</Link>
                </p>
            </div>


        </div>
    );
};

export default Login;
