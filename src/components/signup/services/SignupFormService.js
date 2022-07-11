import {object, string} from "yup";

export const initialValues = {
    name: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',

};

export const formSchema = object({
    name: string("Enter name")
        .required("Name is required"),
    username: string("Enter username")
        .required("Username is required"),
    email: string("Enter email")
        .required("Email is required"),
    mobileNumber: string("Enter mobile number")
        .required("Mobile Number is required"),
    password: string("Enter password")
        .required("Password is required"),
    confirmPassword: string("Enter password again")
        .required("Confirm Password is required")
});
