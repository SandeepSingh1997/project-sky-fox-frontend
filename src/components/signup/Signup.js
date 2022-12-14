import React, { useEffect} from "react";
import {Form, Formik} from "formik";
import {FormikTextField, FormikPasswordField} from "../formik";
import {Button} from "@material-ui/core";
import styles from "./styles/SignupStyles";
import PropTypes from "prop-types";
import useSignup from "./hooks/useSignup";
import {formSchema, initialValues} from "./services/SignupFormService";



const Signup = ({location, history, isAuthenticated, onSignup}) => {

  const classes = styles();
  const {from} = location.state || {from: {pathname: "/login"}};
  const {successMessage, errorMessage, handleSignup} = useSignup(onSignup, history);


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
                    (props) => { const {isValid} = props;
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
                                    name="phoneNumber"
                                    label="Mobile Number"
                                />
                                <FormikPasswordField
                                    required
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                    />
                                <FormikPasswordField
                                    required
                                    margin="dense"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                />
                                {errorMessage()}

                                <Button className={classes.signupButton}
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid}
                                    color="primary"
                                >
                                Signup 
                                </Button>
                            </Form>
                        );
                    }
                }
            </Formik>
            {successMessage()}
        </div>
  );
};

export default Signup;



Signup.propTypes = {
    location: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onSignup: PropTypes.func.isRequired
};


