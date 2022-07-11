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
        const {name, username, email, mobileNumber,password, confirmPassword} = values;

        let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if(!(mobileNumber.length === 10  && mobileNumber !== 0)) {
            setShowError(true);
        }

        if(!values.password.match(paswd)) {
            setShowError(true);
        }

        if(password != confirmPassword) {
            setShowError(true);
        }

        try {
            await onSignup(name, username, email, mobileNumber, password, confirmPassword);
            setShowError(false);
        } catch (err) {
            if (err.response && err.response.status === 401 ) {
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
