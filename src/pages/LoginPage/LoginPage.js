import '../../styles/output.css';
import React, { useState, useContext } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthInfo } = useAuth();

    let history = useNavigate();

    const login = async () => {
        try {
            const user = await AuthService.login(email, password);

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
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-white">Password</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        </div>

                        <button onClick={login} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">
                            Sign In
                        </button>
                        <p className="text-white text-right">
                            <a href="#" className="text-blue-500 hover:text-blue-600">Forgot Password?</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage; 
