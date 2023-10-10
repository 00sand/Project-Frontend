import axios from "axios";
import { getUserIdFromToken, decodeToken } from '../services';
import { useAuth, setAuthInfo } from '../context/AuthContext';

export const Profile = {
    async update(field, value, setAuthInfo) {
        const userId = getUserIdFromToken();

        if (!userId) {
            throw new Error("User ID not found in token.");
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

            // Check if the server response contains a new token
            if (response.data.token) {
                // Store the new token in local storage
                localStorage.setItem('token', response.data.token);
                // Decode the new token to get updated user information
                const updatedUser = decodeToken(response.data.token);
                console.log(updatedUser)

                // Update the app state with the new user information
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

            console.log('Server Response:', response.data);
            return response.data;
        } catch (error) {
            console.error("Update error", error);
            throw error;
        }
    }
};
