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
            console.log(process.env.REACT_APP_API_BASE_URL)
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
        if (error.response) {
            console.error("Server responded with:", error.response.data.message);
            console.error("Errors:", error.response.data.errors);
        }
        console.error("Registration error", error.message);
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