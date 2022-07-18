import { object, string, ref } from "yup";
import apiService from "../../../helpers/apiService";

export const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const passwdD = /^(?=.*[0-9])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdSpl = /^(?=.*[!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;
const passwdUp = /^(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,-.\\\/:;<=>?@[\]^_`{|}~]{8,16}$/;


export const formSchema = object({
  currentPassword: string("Enter Current Password")
    .required("Current Password is required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .matches(
      passwdD,
      "Must contain one digit"
    ).matches(
      passwdSpl,
      "Must contain special characters"
    ).matches(
      passwdUp,
      "Must contain one uppercase and lower case letter"
    ),
  newPassword: string("Enter New password")
    .required("New Password is required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .matches(
      passwdD,
      "Must contain one digit"
    ).matches(
      passwdSpl,
      "Must contain special characters"
    ).matches(
      passwdUp,
      "Must contain one uppercase and lower case letter"
    ),
  confirmPassword: string("Enter Password To Confirm")
    .required("Confirm Password is required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .matches(
      passwdD,
      "Must contain one digit"
    ).matches(
      passwdSpl,
      "Must contain special characters"
    ).matches(
      passwdUp,
      "Must contain one uppercase and lower case letter"
    )
    .oneOf([ref("newPassword"), null], "Passwords must match"),
});


export default {
  put: async (payload) => {
    return await apiService.put("password", payload);
}
}