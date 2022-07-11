import React from "react";
import { Formik } from "formik";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { mount } from "enzyme";

jest.mock("./services/changePasswordPopUpService", () => ({
  __esModule: true,
  initialValues: "initialValues",
  formSchema: "formSchema",
}));

describe("Basic Render", () => {
  it("Should render the change password form with current password, new password and confirm password fields", () => {
    const changePasswordComponent = mount(<ChangePasswordPopup />);

    const formikComponent = changePasswordComponent.find(Formik);

    expect(formikComponent.length).toBe(1);
    expect(formikComponent.prop("initialValues")).toBe("initialValues");
    expect(formikComponent.prop("validationSchema")).toBe("formSchema");
  });
});
