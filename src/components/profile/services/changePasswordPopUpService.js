import { object, string, ref } from "yup";
import apiService from "../../../helpers/apiService";

export const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const passwdD =
  /^(?=.*[0-9])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdSpl =
  /^(?=.*[!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdUp =
  /^(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdLow =
  /^(?=.*[a-z])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;


export const formSchema = object().shape({
  currentPassword: string("Enter Current Password")
    .required("Required")
    .min(8, "Requires atleast 8 characters")
    .max(16, "Requires atmost 16 characters")
    .test("currentPassword", "", function (value) {
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
        let index = errors.findIndex((value)=> value == " uppercase letter")
        if(index)
          errors[index] = " uppercase";
        errors.push(" lowercase letter");
        flag = true;
      }

      errors.forEach((val, index)=>{
        if(index==1)
          val = " a" + val;
        else if(index==errors.length-1 && index>1)
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
    }),
  newPassword: string("Enter New password")
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
        let index = errors.findIndex((value)=> value == " uppercase letter")
        if(index)
          errors[index] = " uppercase";
        errors.push(" lowercase letter");
        flag = true;
      }

      errors.forEach((val, index)=>{
        if(index==1)
          val = " a" + val;
        else if(index==errors.length-1 && index>1)
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
    .notOneOf([ref("currentPassword"), null], "Current and New Password must be different"),
  confirmPassword: string("Enter Password To Confirm")
    .required("Required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .test("confirmPassword", "", function (value) {
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
        let index = errors.findIndex((value)=> value == " uppercase letter")
        if(index)
          errors[index] = " uppercase";
        errors.push(" lowercase letter");
        flag = true;
      }

      errors.forEach((val, index)=>{
        if(index==1)
          val = " a" + val;
        else if(index==errors.length-1 && index>1)
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
    .oneOf([ref("newPassword"), null], "New and Confirm Password must match"),
});

export default {
  put: async (payload) => {
    return await apiService.put("password", payload);
  },
};
