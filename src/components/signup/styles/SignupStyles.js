import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        signupContainer: {
            
            display: "flex",
            justifyContent: "center",
            padding: "20px 40px",
        },
        signupForm: {
            display: "flex",
            flexDirection: "column",
            width: "25%",
        },
        signupButton: {
            marginTop: "15px",
            display: "flex",
            textAlign: "center",
        },
        signupErrorMessage: {
            marginTop: "8px"
        },
        signupSuccessMessage: {
            marginBottom: "28px"
        },
        signupToCentre: {
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
        },
        removeUnderline: {
            textDecoration: "none"
        }

    })
);
