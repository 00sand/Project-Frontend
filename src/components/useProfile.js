import axios from "axios";
import { useState } from 'react';
import { getUserIdFromToken, decodeToken } from '../services';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
    const { setAuthInfo } = useAuth();
    const userId = getUserIdFromToken();

    const [error, setError] = useState(null);

    const updateProfile = async (field, value) => {
        if (!userId) {
            setError("User ID not found.");
            throw new Error("User ID not found.");
        }

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
                { [field]: value },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const updatedUser = decodeToken(response.data.token);

                setAuthInfo(prevState => ({
                    ...prevState,
                    username: updatedUser.username
                }));
            } else {
                const updatedUser = decodeToken(response.data.token);
                setAuthInfo(prevState => ({
                    ...prevState,
                    username: updatedUser.username
                }));
            }

            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        updateProfile,
        error
    };
};
