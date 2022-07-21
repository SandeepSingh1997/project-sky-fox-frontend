import {object, string} from "yup";
import * as Yup from 'yup';
import usernameError from "../hooks/useSignup";
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

const passwdD =
  /^(?=.*[0-9])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdSpl =
  /^(?=.*[!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdUp =
  /^(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdLow =
  /^(?=.*[a-z])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;

// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/; 
// const phoneZero = /^(?!0+$)\d{8,}$/;


export const formSchema = object({
    
    name: string("Enter name")
        .required("Name is required")
        .matches(/^[A-Za-z ]*$/, "Must be a valid name")
        .max(30),
    username: string("Enter username") 
        .required("Username is required")
        .matches(/^\S*$/, "Whitespace is not allowed")
        // .test("username", "", function(value) {
        //     if (!usernameError) {
        //         return this.createError({
        //         message: "Username already exists",
        //         });
        //     }
        // })
        .max(30),
    email: string("Enter email")
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    phoneNumber: string("Enter mobile number")
        // .matches(phoneZero, "Enter a valid mobile number")
        // .matches(phoneRegExp, "Enter a valid mobile number")
        .max(10, "Enter a valid mobile number")
        .min(10, "Enter a valid mobile number")
        .required("Mobile Number is required"),
    password: string("Enter password")
        .matches(/^\S*$/, "Whitespace is not allowed")
        .required("Required")
        .min(8, "Password is too short - should be 8 characters minimum.")
        .max(16, "Password is too long - should be 16 characters maximum")
        .test("newPassword", "", function (value) {
        let errors = ["Requires"];
        let errorMessage = "";
        let flag = false;

        if (!passwdD.test(value)) {
            errors.push(" digit");
            flag = true;
        }
        if (!passwdSpl.test(value)) {
            errors.push(" special character");
            flag = true;
        }
        if (!passwdUp.test(value)) {
            errors.push(" uppercase letter");
            flag = true;
        }
        if (!passwdLow.test(value)) {
            let index = errors.findIndex((value)=> value === " uppercase letter")
            if(index)
            errors[index] = " uppercase";
            errors.push(" lowercase letter");
            flag = true;
        }

        errors.forEach((val, index)=>{
            if(index===1)
            val = " a" + val;
            else if(index===errors.length-1 && index>1)
            val = " and" + val;
            else if(index<errors.length-1 && index>1)
            val = "," + val;
            errorMessage += val;
        });

        if (flag) {
            return this.createError({
            message: errorMessage,
            });
        } else {
            return true;
        }
        })
        .required("Password is required")
        .required("Password requires a digit, special character and uppercase letter"),
    confirmPassword: string("Enter password again")
        .oneOf([Yup.ref('password'), null], 'Password and confirm password do not match')
        .required("Confirm Password is required")
});

