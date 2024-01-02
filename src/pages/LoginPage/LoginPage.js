import '../../styles/output.css';
import React from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
    const schema = yup.object({
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup.string().required("Password is required"),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const { setAuthInfo } = useAuth();

    let history = useNavigate();

    const login = async (data) => {
        try {
            const user = await AuthService.login(data.email, data.password);

            setAuthInfo({
                username: user.username,
                role: user.role,
                userId: user.userId,
                isLoggedIn: true,
            });
            console.log("success!!")
            history('/home')

        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <>
            <div className="bg-gray-900 flex items-center justify-center h-screen">
                <div className="w-96 p-8 bg-gray-800 rounded-lg">
                    <h1 className="text-3xl text-white font-bold mb-6">Login</h1>
                    <form onSubmit={handleSubmit(login)} className="space-y-4">
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
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">Sign In</button>
                        <p className="text-white text-right">
                            <a href="#" className="text-blue-500 hover:text-blue-600">Forgot Password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;