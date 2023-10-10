import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onLogout }) => {
    const { authState } = useAuth();
    console.log(authState.username)
    return (
        <nav className="bg-gray-900 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center flex-row-reverse">
                {!authState.isLoggedIn &&
                    <ul className="flex space-x-8">
                        <li>
                            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
                        </li>
                        <li className="pr-6">
                            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</Link>
                        </li>
                    </ul>
                }

                {authState.isLoggedIn &&
                    <ul className="flex space-x-8 ">
                        <li>
                            <Link to="/home" className="text-white hover:text-blue-500 text-lg">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="text-white hover:text-blue-500 text-lg">Profile</Link>
                        </li>
                        <li>
                            <p className="text-white text-lg">{`Welcome ${authState.username}`}</p>
                        </li>
                        <li className="pr-6">
                            <button onClick={onLogout} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Logout</button>
                        </li>
                    </ul>
                }
            </div>
        </nav>

    );
};
