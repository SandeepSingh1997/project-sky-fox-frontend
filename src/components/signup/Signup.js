import React, { useEffect} from "react";
import {Form, Formik} from "formik";
import {FormikTextField} from "../formik";
import {Button} from "@material-ui/core";
import styles from "./styles/SignupStyles";
import PropTypes from "prop-types";
import useSignup from "./hooks/useSignup";
import {formSchema, initialValues} from "./services/SignupFormService";

const Signup = ({location, history, isAuthenticated, onSignup}) => {
  const classes = styles();
  const {from} = location.state || {from: {pathname: "/"}};
  const {errorMessage, handleSignup} = useSignup(onSignup);

  useEffect(() => {
    if (isAuthenticated) {
        history.replace(from);
    }
  });

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
                                    type="password"
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                />
                                <FormikTextField
                                    required
                                    type="password"
                                    margin="dense"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                />
                                {
                                    errorMessage()
                                }
                                <a className={classes.removeUnderline} href="/login">
                                <Button className={classes.signupButton}
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid}
                                    color="primary" 
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


