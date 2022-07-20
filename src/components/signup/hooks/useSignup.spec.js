import {act, renderHook} from "@testing-library/react-hooks";
import useSignup from "./useSignup";
import React from "react";
import {when} from "jest-when";
import {shallow} from "enzyme";


describe("Basic logic", () => {

    const testName = "testName";
    const testUsername = "testUsername";
    const testEmail = "testEmail@email.com";
    const testphoneNumber = "9234567891";
    const testPassword = "testPassword1&A";
    const testConfirmPassword = "testPassword1&A";

    const SignupValues = {
        name: testName,
        email: testEmail,
        phoneNumber: testphoneNumber,
        username: testUsername,
        password: testPassword
    };

    it("should initially not show error message", () => {
        const testOnSignup = jest.fn();
        const renderHookResult = renderHook(() => useSignup(testOnSignup));
        const result = renderHookResult.result;
        const {errorMessage} = result

        expect(errorMessage).toBeUndefined();
    });


    // it("should show success message if signed up succesfully", async () => {
    //     const testOnSignup = jest.fn();
    //     when(testOnSignup).calledWith(testName, testEmail, testphoneNumber, testUsername, testPassword, testConfirmPassword).mockResolvedValue("Unused");
    //     const renderHookResult = renderHook((status) => useSignup(testOnSignup, history));
    //     const result = renderHookResult.result;
    //     const {handleSignup} = result.current;

    //     await act(() => handleSignup(SignupValues));
    //     const {errorMessage} = result.current;
    //     expect(errorMessage).toBeCalled();
    //     // expect(screen.getByText("Successfully signed up")).toBeInTheDocument();
    //     // expect(testOnSignup).toHaveBeenCalledWith(testName, testEmail, testphoneNumber, testUsername, testPassword, testConfirmPassword);
    // });

});