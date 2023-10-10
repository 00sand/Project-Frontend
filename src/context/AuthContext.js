import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { decodeToken, getTokenFromStorage } from '../services/tokenService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialAuthState = () => {
        const token = getTokenFromStorage();
        const decoded = decodeToken(token);

        if (decoded) {
            return {
                username: decoded.username,
                role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                userId: decoded.userId,
                isLoggedIn: true
            };
        }

        return {
            username: null,
            role: null,
            userId: null,
            isLoggedIn: false
        };
    }

    const [authState, setAuthState] = useState(initialAuthState);

    useEffect(() => {
        console.log('authState has changed:', authState);
    }, [authState]);

    const setAuthInfo = useCallback((data) => {
        setAuthState(data);
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('context is null');
    }
    return context;
};
