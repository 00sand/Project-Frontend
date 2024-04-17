import axios from "axios";
import { decodeToken, getUserIdFromToken, getUsernameFromToken, getRoleFromToken } from './tokenService';
import jwtDecode from "jwt-decode";

const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
            email,
            password,
        });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        const token = response.data.jwtToken;

        localStorage.setItem("token", token);

        const user = {
            username: getUsernameFromToken(),
            role: getRoleFromToken(),
            userId: getUserIdFromToken()
        };

        return user;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};

const register = async (username, email, password, role) => {
    const payload = {
        UserName: username,
        Email: email,
        Password: password,
        Role: role
    };

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, payload);

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        const token = response.data.jwtToken;

        localStorage.setItem("token", token);

        const user = {
            username: getUsernameFromToken(),
            role: getRoleFromToken(),
            userId: getUserIdFromToken()
        };

        return user;
    } catch (error) {
        // Enhanced error logging
        console.error("Registration error", error.message);
        if (error.response) {
            // Log more details from the server's response if available
            console.error("Server responded with:", error.response.status, error.response.statusText);
            console.error("Server data:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error("Error setting up request:", error.message);
        }
        throw error;
    }
};


const logout = () => {
    localStorage.removeItem("token");
};


export const AuthService = {
    login,
    logout,
    register
};