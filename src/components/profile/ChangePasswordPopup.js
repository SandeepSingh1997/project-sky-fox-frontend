import { Form, Formik } from "formik";
import { FormikTextField, FormikPasswordField } from "../formik";
import { Button, Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import {
  formSchema,
  initialValues,
} from "./services/changePasswordPopUpService";
import styles from "./styles/changePasswordStyles";
import { Close } from "@material-ui/icons";

export default function ChangePasswordPopup(props) {
  const classes = styles();

  return (
    <Dialog open={props.open} onClose={props.handleDialogClose}>
      <DialogTitle className={classes.title}>
        Change Password{" "}
        <Close className={classes.close} onClick={props.handleDialogClose} />
      </DialogTitle>
      <Formik initialValues={initialValues} validationSchema={formSchema}>
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
    </Dialog>
  );
}
