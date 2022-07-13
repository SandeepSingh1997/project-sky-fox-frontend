import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/SignupStyles";
import {Button, Snackbar} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";




export default (onSignup) => {
    const classes = styles();
    const [showError, setShowError] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    


    function handleClose() {
      setToastOpen(false);
    }
    

    const successMessage = () => {
            return (
                <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Signup successfull
                    </Alert>
                </Snackbar>
            )
    }

    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" className={classes.signupErrorMessage}>
                    Signup failed
                </Typography>
            )
        }
        
    };


    const handleSignup = async (values) => {
        const {name, username, email, mobileNumber,password, confirmPassword} = values;

        let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if(!(mobileNumber.length === 10  && mobileNumber !== 0) && (values.password.match(paswd)) && (password === confirmPassword)) {  
            setShowError(true);   
        }

        try {
            setToastOpen(true);
            await onSignup(name, username, email, mobileNumber, password, confirmPassword);
            setShowError(false);    
            
        }
         catch (err) {
            if (err.response && err.response.status === 401 ) {
                setShowError(true);
            } else {
                throw err;
            }
        }
    };

    return {
        errorMessage: errorMessage,
        handleSignup: handleSignup,
        successMessage: successMessage
    };
};
