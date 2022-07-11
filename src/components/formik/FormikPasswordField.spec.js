import { TextField } from "@material-ui/core";
import { render } from "enzyme";
import React from "react";
import FormikPasswordField from "./FormikPasswordField";
import {when} from "jest-when";
import {useField} from "formik";


jest.mock("formik");

describe("Basic Rendering",()=>{

    let field;
    let meta;


    beforeEach(() => {
        field = {
            value: "test value field",
            onChange: "test on change field",
            onBlur: "test on blur field"
        };

        meta = {
            error: "test error",
            touched: true
        };
    });

    it("show hide the password by default",()=>{

        when(useField).calledWith("test field").mockReturnValue([field, meta]);
       const passwordComponent= render( <FormikPasswordField
        required
        margin="dense"
        name="test field"
        label="Confirm Password"
      />)

        const passwordField=passwordComponent.find(TextField);
       
        expect( passwordField).toBeDefined();
    })
})