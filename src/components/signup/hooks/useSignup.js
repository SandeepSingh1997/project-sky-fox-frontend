import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/SignupStyles";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default (onSignup, history) => {
  const classes = styles();
  const [showError, setShowError] = useState(false);
  // const [toastOpen, setToastOpen] = useState(false);
  const [toast, setToast] = useState({
    status: false,
    message: "",
    severity: "success",
  });


  function handleClose() {
    setToast({ ...toast, status: false });
  }
  const successMessage = () => {
    return (
      <>
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
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    )}
    </>
  )};

  const errorMessage = () => {
    if (showError) {
      return (
        <Typography
          variant="body1"
          color="error"
          className={classes.signupErrorMessage}
        >
          Signup failed
        </Typography>
      );
    }
  };

  const handleSignup =  async (values) => {
    const { name, email, phoneNumber, username, password, confirmPassword } = values;

    let paswd = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (
      !(phoneNumber.length === 10 && phoneNumber !== 0) && password.match(paswd) && password === confirmPassword) {
      setShowError(true);
    }

    try {
      const response = await onSignup(
        name,
        email,
        phoneNumber,
        username,
        password
      );
      setShowError(false);

      if(response.status === 201){
        setToast({
          message: "Successfully signed up",
          status: true,
          severity: "success",
        });
        setTimeout(() => {
          history.replace("/login");
        }, 2000);
      }
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setToast({
          message: err.response.data.message,
          status: true,
          severity: "error",
        });
      }
      if (err.response && err.response.status === 400) {
        setToast({
            message: "Username already exists",
            status: true,
            severity: "error",
        });
      } else {
        throw err;
      }
   };
  }
  

  return {
    errorMessage: errorMessage,
    handleSignup: handleSignup,
    successMessage: successMessage,
  };
}

