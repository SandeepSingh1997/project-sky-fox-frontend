import { Form, Formik } from "formik";
import { FormikPasswordField } from "../formik";
import { Button, Dialog, DialogTitle, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState, ReactDOM } from "react";
import changePasswordPopupService from "./services/changePasswordPopUpService";
import {
  formSchema,
  initialValues,
} from "./services/changePasswordPopUpService";
import styles from "./styles/changePasswordStyles";
import { Close } from "@material-ui/icons";

export default function ChangePasswordPopup(props) {

  const classes = styles();
  const [toast, setToast] = useState({
    status: false,
    message: "",
    severity: "success",
  });

  function handleClose() {
    setToast({ ...toast, status: false });
  }

  const handleSubmit = async (formData) => {
    const payload = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    try {
      const response = await changePasswordPopupService.put(payload);
      if (response.status === 200) {
        setToast({
          message: "Your password has been changed successfully",
          status: true,
          severity: "success",
        });
        setTimeout(() => {
          window.history.replaceState(null, null, "/login")
          props.onLogout();
        }, 2000);
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 400) {
        setToast({
          message: err.response.data.message,
          status: true,
          severity: "error",
        });
      }
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleDialogClose}>
      <DialogTitle className={classes.title}>
        Change Password{" "}
        <Close className={classes.close} onClick={props.handleDialogClose} />
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
      >
        {(props) => {
          const { isValid } = props;
          return (
            <Form className={classes.form}>
              <FormikPasswordField
                required
                margin="dense"
                name="currentPassword"
                label="Current Password"
              />
              <FormikPasswordField
                required
                margin="dense"
                name="newPassword"
                label="New Password"
              />
              <FormikPasswordField
                required
                margin="dense"
                name="confirmPassword"
                label="Confirm Password"
              />
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                color="primary"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>

      {toast.status && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={toast.status}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </Dialog>
  );
}
