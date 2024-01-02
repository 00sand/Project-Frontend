import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/AuthService';
import '../../styles/output.css';

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required"),
    role: yup.string().required("Role is required")
}).required();

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const { setAuthInfo } = useAuth();
    let history = useNavigate();

    const registerUser = async (data) => {
        try {
            const user = await AuthService.register(data.username, data.email, data.password, data.role);

            if (user && user.username) {
                setAuthInfo({
                    username: user.username,
                    role: user.role,
                    userId: user.userId,
                    isLoggedIn: true,
                });
                console.log("Registration success!");
                history('/home');
            } else {
                console.error("Unexpected user object:", user);
            }
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    };

    return (
        <div className="bg-gray-900 flex items-center justify-center h-screen">
            <div className="w-96 p-8 bg-gray-800 rounded-lg">
                <h1 className="text-3xl text-white font-bold mb-6">Register</h1>
                <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white">Username</label>
                        <input {...register("username")} type="text" id="username" className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white">Email</label>
                        <input {...register("email")} type="email" id="email" className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white">Password</label>
                        <input {...register("password")} type="password" id="password" className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="role" className="text-white">Role</label>
                        <select {...register("role")} id="role" className="w-full bg-gray-700 text-white rounded-md py-2 px-3">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">
                        Register
                    </button>
                    <p className="text-white text-center">
                        Already have an account?
                        <a href="/login" className="text-blue-500 hover:text-blue-600"> Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;

