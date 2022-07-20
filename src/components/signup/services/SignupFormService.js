import {object, string} from "yup";
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const initialValues = {
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',

};
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/; 
const phoneZero = /^(?!0+$)\d{8,}$/;


export const formSchema = object({
    name: string("Enter name")
        .required("Name is required")
        .matches(/^[A-Za-z ]*$/, 'Must be a valid name')
        .max(30),
    username: string("Enter username") 
        .required("Username is required")
        .matches(/^[A-Za-z ]*$/, 'Must be a valid username')
        .matches(/^\S*$/, 'Whitespace is not allowed')
        .max(30),
    email: string("Enter email")
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    phoneNumber: string("Enter mobile number")
        .max(10, "Must be 10 digits")
        .min(10, "Must be 10 digits")
        .matches(phoneZero, 'Must be a valid mobile number')
        .matches(phoneRegExp, 'Must be a valid mobile number')
        .required("Mobile Number is required"),
    password: string("Enter password")
        .matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, "Must be more than 8 characters")
        .max(16,"Must be less than 17 characters")
        .minUppercase(1, 'Must contain at least 1 upper case letter')
        .minNumbers(1, 'Must contain at least 1 number')
        .minSymbols(1, 'Must contain at least 1 special character')
        .required("Password is required")
        .required("Password requires a digit , special character and uppercase letter"),
    confirmPassword: string("Enter password again")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Confirm Password is required")
});

