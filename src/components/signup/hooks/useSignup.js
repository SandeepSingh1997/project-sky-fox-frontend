import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/SignupStyles";

export default (onSignup) => {
    const classes = styles();
    const [showError, setShowError] = useState(false);

    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" className={classes.loginErrorMessage}>
                    Signup failed
                </Typography>
            )
        }
    };

    const handleSignup = async (values) => {
        const {name, username, email, mobileNumber, password, confirmPassword} = values;
        try {
            await onSignup(name, username, email, mobileNumber, password, confirmPassword);
            setShowError(false);
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
        handleSignup: handleSignup
    };
};
