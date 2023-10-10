import '../../styles/output.css';
import React, { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function RegisterPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const { setAuthInfo } = useAuth();

    let history = useNavigate();

    const register = async () => {
        try {
            const user = await AuthService.register(username, email, password, role);

            if (user && user.username) {
                setAuthInfo({
                    username: user.username,
                    role: user.role,
                    userId: user.userId,
                    isLoggedIn: true,
                });
                console.log("Registration success!")
                history('/home')
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
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="text-white">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md py-2 px-3"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button onClick={register} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">
                        Register
                    </button>
                    <p className="text-white text-center">
                        Already have an account?
                        <a href="/login" className="text-blue-500 hover:text-blue-600"> Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
