import {useEffect, useState} from "react";
import {isLoggedIn, login, logout, signup} from "../../../helpers/authService";

export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
    }, []);

    const handleLogin = async (username, password) => {
        const userDetails = await login(username, password);
        setIsAuthenticated(true);
        return userDetails;
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    };

    const handleSignup = async(name, username, email, mobileNumber, password) => 
    {
        const response = await signup(name, username, email, mobileNumber, password)
        return response;
    }

    return {
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleSignup: handleSignup
    };
}
