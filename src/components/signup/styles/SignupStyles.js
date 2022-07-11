import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        signupContainer: {
            display: "flex",
            justifyContent: "center",
            padding: "20px 40px"
        },
        signupForm: {
            display: "flex",
            flexDirection: "column",
        },
        signupButton: {
            marginTop: "15px",
            display: "flex",
            textAlign: "center",
            width: "300px",
        },
        signupErrorMessage: {
            marginTop: "8px"
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
