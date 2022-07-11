import React from "react";
import {mount} from "enzyme";
import {fireEvent, queryAllByRole, render, screen} from '@testing-library/react';
import Signup from "./Signup";
// noinspection ES6CheckImport
import useSignup from "./hooks/useSignup";
import {when} from "jest-when";
import {Formik} from "formik";

jest.mock("./hooks/useSignup", () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock("./services/SignupFormService", () => ({
        __esModule: true,
        initialValues: "initialValues",
        formSchema: "formSchema"
    })
);

describe("Basic Rendering", () => {
    const testOnSignup = jest.fn();
    const testHandleSignup = jest.fn();
    const testReferrer = "/testReferrer";
    const testFrom = "testFrom";
    const TestErrorComponent = () => <div/>;

    beforeEach(() => {
        when(useSignup).calledWith(testOnSignup).mockReturnValue({
            errorMessage: () => <TestErrorComponent/>,
            handleSignup: testHandleSignup
        });
    });

    it("should go to from url when authenticated", () => {
        const testHistory = {replace: jest.fn()};
        mount(<Signup isAuthenticated={true} onSignup={testOnSignup}
                     location={{state: {from: testFrom}}} history={testHistory}/>);

        expect(testHistory.replace).toBeCalledTimes(1);
        expect(testHistory.replace).toHaveBeenCalledWith(testFrom);
    });

    it("should render signup form when not authenticated", () => {
        const signupComponent = mount(<Signup isAuthenticated={false} onSignup={testOnSignup}
                                            location={{state: {referrer: testReferrer}}}/>);

        const formikComponent = signupComponent.find(Formik);
        const testErrorDivComponent = signupComponent.find(TestErrorComponent);
        expect(testErrorDivComponent.length).toBe(1);
        expect(formikComponent.prop("initialValues")).toBe("initialValues");
        expect(formikComponent.prop("validationSchema")).toBe("formSchema");
        expect(formikComponent.prop("onSubmit")).toEqual(testHandleSignup);
    });

    // it("should redirect to login page when signup is clicked", () => {
    //     render(<Signup isAuthenticated={false} onSignup={testOnSignup}
    //                         location={{state: {referrer: testReferrer}}}/>);
    //     const linkEl = screen.getByRole('button', { name: "Signup" });expect(getByRole('button', {name: "Login"})).toBeInTheDocument();

    // });
});
