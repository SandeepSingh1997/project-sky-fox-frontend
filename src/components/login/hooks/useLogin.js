import React, { useState, useContext } from "react";
import { AppContext } from "../../layout/Layout";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/loginStyles"

export default (onLogin, history) => {
    const classes = styles();
    const [showError, setShowError] = useState(false);

    const { state, dispatch } = useContext(AppContext);

    const changeUser = (newValue) => {

        dispatch({ type: 'UPDATE_INPUT', data: newValue });
    };

    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" className={classes.loginErrorMessage}>
                    Login failed
                </Typography>
            )
        }
    };

    const handleLogin = async (values) => {
        const { username, password } = values;
        try {
            const userDetails = await onLogin(username, password);
            changeUser({"id": userDetails.id, "role": userDetails.role});
            setShowError(false);
            history.replace('/');
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
        handleLogin: handleLogin,
    };
};
