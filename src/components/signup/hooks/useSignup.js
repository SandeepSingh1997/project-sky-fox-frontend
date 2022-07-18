import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/SignupStyles";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default (onSignup, history) => {
  const classes = styles();
  const [showError, setShowError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  function handleClose() {
    setToastOpen(false);
  }

  const successMessage = () => {
    return (
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Signup successfull
        </Alert>
      </Snackbar>
    );
  };

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

    let paswd =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if (
      !(phoneNumber.length === 10 && phoneNumber !== 0) &&
      values.password.match(paswd) &&
      password === confirmPassword
    ) {
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

      if(response.status === 201){
        setToastOpen(true);
        setShowError(false);
        history.push("/login");
      }
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setShowError(true);
      } else {
        throw err;
      }
     }
   };

  return {
    errorMessage: errorMessage,
    handleSignup: handleSignup,
    successMessage: successMessage,
  };
};

