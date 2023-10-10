import jwtDecode from "jwt-decode";

export const decodeToken = (token) => {
    if (!token) return null;
    return jwtDecode(token);
};

export const getTokenFromStorage = () => {
    return localStorage.getItem("token");
};


const getDecodedTokenProperty = (property) => {
    const token = getTokenFromStorage();
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken[property] : null;
};

export const getUserIdFromToken = () => {
    return getDecodedTokenProperty('userId');
};

export const getUsernameFromToken = () => {
    return getDecodedTokenProperty('username');
};

export const getRoleFromToken = () => {
    return getDecodedTokenProperty('http://schemas.microsoft.com/ws/2008/06/identity/claims/role');
};

