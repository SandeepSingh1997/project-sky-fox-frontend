import React from "react";
import { Formik } from "formik";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { mount } from "enzyme";
import { FormikPasswordField } from "../formik";
import { Close } from "@material-ui/icons";
import { fireEvent } from "@testing-library/react";

jest.mock("./services/changePasswordPopUpService", () => ({
  __esModule: true,
  initialValues: "initialValues",
  formSchema: "formSchema",
}));

const handleClose = jest.fn();

describe("Basic Render", () => {
  it("Should render the change password form", () => {
    const changePasswordComponent = mount(<ChangePasswordPopup open={true} />);

    const formikComponent = changePasswordComponent.find(Formik);

    expect(formikComponent.length).toBe(1);
    expect(formikComponent.prop("initialValues")).toBe("initialValues");
    expect(formikComponent.prop("validationSchema")).toBe("formSchema");
  });

  it("change password form should contain current password, new password and confirm password fields", () => {
    const changePasswordComponent = mount(<ChangePasswordPopup open={true} />);

    const formikTextFieldComponent =
      changePasswordComponent.find(FormikPasswordField);

    expect(formikTextFieldComponent.length).toBe(3);
  });

  it("should close the dchange password popup on clicking close button", () => {
    const profileComponent = mount(
      <ChangePasswordPopup open={true} handleDialogClose={handleClose} />
    );
    const closeIconComponent = profileComponent.find(Close);

    closeIconComponent.simulate("click");

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
