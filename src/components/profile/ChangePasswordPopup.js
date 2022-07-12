import { Form, Formik } from "formik";
import { FormikTextField, FormikPasswordField } from "../formik";
import {
  Button,
  Dialog,
  DialogTitle,
  Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import {
  formSchema,
  initialValues,
} from "./services/changePasswordPopUpService";
import styles from "./styles/changePasswordStyles";
import { Close } from "@material-ui/icons";

export default function ChangePasswordPopup(props) {
  const classes = styles();
  const [toastOpen, setToastOpen] = useState(false);

  function handleClose() {
    setToastOpen(false);
  }

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
          setToastOpen(true);
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

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

