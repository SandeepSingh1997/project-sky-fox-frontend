import axios from "axios";
import {urls} from "../config/env-config";
import apiService from "./apiService";
const tokenKey = 'skyfox_token';

export const authHeader = () => {
    return {
        headers: {
            "Authorization": "Basic " + localStorage.getItem(tokenKey),
            // "Access-Control-Allow-Origin": "*",
        }
    };
}

export const login = async (username, password) => {
    const token = authBasic(username, password);
    const config = {
        headers: {
            Authorization: 'Basic ' + token
        }
    };
    const response = await axios.get(`${urls.service}/login`, config);
    const userDetails = response.data;
    localStorage.setItem(tokenKey, token)
    return userDetails;
}

export const signup = async (name, email, phoneNumber, username,  password) => {
    const data = {
            name : name,
            email : email,
            phoneNumber : phoneNumber,
            username: username,
            password: password
        }

    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('phoneNumber', phoneNumber);
    params.append('username', username);
    params.append('password', password);
    console.log(params);

    const response = await apiService.post("customers", data);
    return response;
}

export const isLoggedIn = () => {
    return localStorage.getItem(tokenKey) !== null;
}

export const isSignedUp = () => {
    return localStorage.getItem(tokenKey) !== null;
}

export const logout = () => {
    localStorage.removeItem(tokenKey);
};

const authBasic = (username, password) => {
    return window.btoa(username + ':' + password);
}

