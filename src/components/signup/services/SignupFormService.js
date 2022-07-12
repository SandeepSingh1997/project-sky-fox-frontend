import {object, string} from "yup";
import * as Yup from 'yup';


export const initialValues = {
    name: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',

};
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/; 
const phoneZero = /^(?!0+$)\d{8,}$/;
const passwdD = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const passwdSpl = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const passwdUp = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export const formSchema = object({
    name: string("Enter name")
        .required("Name is required"),
    username: string("Enter username") //check from backend
        .required("Username is required"),
    email: string("Enter email")
        .required("Email is required"),
    mobileNumber: string("Enter mobile number")
        .matches(phoneZero, 'Phone number is not valid')
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(10, "Must be 10 digits")
        .required("Mobile Number is required"),
    password: string("Enter password")
        .matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, "Must be more than 8 characters")
        .max(16,"Must be less than 17 characters")
        .matches(passwdD, "Must include a digit")
        .matches(passwdSpl, "Must include a special character")
        .matches(passwdUp, "Must include an uppercase letter")
        .required("Password is required")
        .required("Password requires a digit, special character and uppercase letter"),
    confirmPassword: string("Enter password again")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Confirm Password is required")
});
