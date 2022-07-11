import {Form, Formik} from "formik";
import {FormikTextField} from "../formik";
import {Button} from "@material-ui/core";
import React from "react";
import {
  formSchema,
  initialValues,
} from "./services/changePasswordPopUpService";

export default function ChangePasswordPopup() {
  return (
    <>
      <h1>Change Password</h1>
      <Formik initialValues={initialValues} validationSchema={formSchema}>
        
      </Formik>
    </>
  );
}
