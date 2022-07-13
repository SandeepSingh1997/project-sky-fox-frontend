import { Email } from "@material-ui/icons";
import {useEffect, useState} from "react";
import {isLoggedIn, login, logout, signup} from "../../../helpers/authService";
import Signup from "../../signup/Signup";

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

    const handleSignup = async(name, username, email, mobileNumner, password, confirmPassword) => 
    {
        const userSDetails = await signup(name, username, email, mobileNumner, password, confirmPassword)
        setIsAuthenticated(true);
        return userSDetails;
        
    }

    return {
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleSignup: handleSignup
    };
}
