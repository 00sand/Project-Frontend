import React, { useState, useEffect } from "react";
import { Profile } from '../../components/Profile';
import { useAuth, setAuthInfo } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const [newUsername, setNewUsername] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const { authState, setAuthInfo } = useAuth();
    const history = useNavigate();

    useEffect(() => {
        console.log("Auth State Updated:", authState);
    }, [authState]);

    const handleSubmit = async (field, value1, value2) => {
        if ((field === "email" || field === "password") && value1 !== value2) {
            alert("Values do not match");
            return;
        }

        try {
            await Profile.update(field, value1, setAuthInfo);
            alert("User information updated");
            history("/home")


        } catch (error) {
            alert("Update failed: " + error.message);
        }
    }

    return (
        <div className="bg-gray-900 flex items-center justify-center h-screen">
            <div className="w-96 p-8 bg-gray-800 rounded-lg">
                <h1 className="text-3xl text-white font-bold mb-6">Profile</h1>

                <h2 className="text-xl text-white mb-4">{authState.username}</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white">New Username</label>
                        <input type="text" id="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        <button onClick={() => handleSubmit('username', newUsername)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md mt-2">Update Username</button>
                    </div>

                    <div>
                        <label htmlFor="email1" className="text-white">New Email</label>
                        <input type="email" id="email1" value={email1} onChange={e => setEmail1(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        <input type="email" id="email2" placeholder="Confirm Email" value={email2} onChange={e => setEmail2(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3 mt-2" />
                        <button onClick={() => handleSubmit('email', email1, email2)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md mt-2">Update Email</button>
                    </div>

                    <div>
                        <label htmlFor="password1" className="text-white">New Password</label>
                        <input type="password" id="password1" value={password1} onChange={e => setPassword1(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                        <input type="password" id="password2" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3 mt-2" />
                        <button onClick={() => handleSubmit('password', password1, password2)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md mt-2">Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;