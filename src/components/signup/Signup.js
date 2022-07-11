import React, { useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {FormikTextField} from "../formik";
import {Button} from "@material-ui/core";
import styles from "./styles/SignupStyles";
import PropTypes from "prop-types";
import useSignup from "./hooks/useSignup";
import {formSchema, initialValues} from "./services/SignupFormService";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {useHistory} from "react-router-dom";




const Signup = ({location, history, isAuthenticated, onSignup}) => {

  const classes = styles();
  const {from} = location.state || {from: {pathname: "/"}};
  const {successMessage, errorMessage, handleSignup} = useSignup(onSignup);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownC, setPasswordShownC] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
        history.replace(from);
    }
  });

  const handleSubmit = () => {
    history.push("/login");
  }

  const iconON = "<VisibilityIcon />";
  const iconOFF = "<VisibilityOffIcon>";

  const togglePassword = () => {
    setPasswordShown(!passwordShown);

  };

  const toggleCPassword = () => {
  setPasswordShownC(!passwordShownC);

    };

  return (
    <div className={classes.signupContainer}>
            <Formik initialValues={initialValues}
                    onSubmit={handleSignup}
                    validationSchema={formSchema}>
                {
                    (props) => { const {isValid,} = props;
                        return (
                            <Form className={classes.signupForm}>
                              <FormikTextField
                                    required
                                    margin="dense"
                                    name="name"
                                    label="Name"
                                />
                                <FormikTextField
                                    required
                                    margin="dense"
                                    name="username"
                                    label="Username"
                                />
                                <FormikTextField
                                    required
                                    margin="dense"
                                    name="email"
                                    label="Email"
                                />
                                <FormikTextField
                                    required
                                    margin="dense"
                                    name="mobileNumber"
                                    label="Mobile Number"
                                />
                                <FormikTextField
                                    required
                                    type={passwordShown ? "text" : "password"}
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                    /><span className="classes.icon" onClick={togglePassword}><VisibilityIcon /></span>
                                <FormikTextField
                                    required
                                    type={passwordShownC ? "text" : "password"}
                                    margin="dense"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                /><span className="classes.iconC" onClick={toggleCPassword}><VisibilityIcon /></span>
                                {
                                    errorMessage()  
                                }
                                <a className={classes.removeUnderline} href="/login">
                                <Button className={classes.signupButton}
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid}
                                    color="primary" 
                                    onClick={handleSubmit}
                                >
                                Signup 
                                </Button></a>
                            </Form>
                        );
                    }
                }
            </Formik>
        </div>
  );
};

export default Signup;



Signup.propTypes = {
    location: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onSignup: PropTypes.func.isRequired
};


