import React, { useState } from "react";
import { useField } from "formik";
import {
  TextField,
  IconButton,
  InputAdornment,
  Input,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";

import styles from "./styles/formikPasswordFieldStyles";
import PropTypes from "prop-types";

const FormikPasswordField = (props) => {
  const classes = styles();
  const [field, meta] = useField(props.name);

  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;

  const [visibilityStatus, changeVisibilityStatus] = useState(false);

  const handleClickShowPassword = () => {
    console.log("he");
    changeVisibilityStatus(!visibilityStatus);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      value={value}
      type={visibilityStatus ? "text" : "password"}
      onChange={onChange}
      onBlur={onBlur}
      error={touched && Boolean(error)}
      helperText={touched ? error : ""}
      FormHelperTextProps={{
        className: classes.helperText,
      }}
      InputProps={{
        // <-- This is where the toggle button is added.
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {visibilityStatus ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

FormikPasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormikPasswordField;
