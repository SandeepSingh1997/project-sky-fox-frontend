import { object, string, ref } from "yup";

export const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const formSchema = object({
  currentPassword: string("Enter Current Password")
    .required("Current Password is required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  newPassword: string("Enter New password")
    .required("New Password is required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: string("Enter Password To Confirm")
    .required("Confirm Password is required")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(16, "Password is too long - should be 16 characters maximum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .oneOf([ref("newPassword"), null], "Passwords must match"),
});
