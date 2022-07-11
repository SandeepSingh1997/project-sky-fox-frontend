import {act, renderHook} from "@testing-library/react-hooks";
import useSignup from "./useSignup";
import React from "react";
import {when} from "jest-when";
import {shallow} from "enzyme";

describe("Basic logic", () => {

    const testName = "testName";
    const testUsername = "testUsername";
    const testEmail = "testEmail@email.com";
    const testmobileNumber = "1234567891";
    const testPassword = "testPassword1&A";
    const testConfirmPassword = "testPassword1&A";

    const SignupValues = {
        name: testName,
        username: testUsername,
        email: testEmail,
        mobileNumber: testmobileNumber,
        password: testPassword,
        confirmPassword: testConfirmPassword

    };

    it("should initially not show error message", () => {
        const testOnSignup = jest.fn();
        const renderHookResult = renderHook(() => useSignup(testOnSignup));
        const result = renderHookResult.result;
        const {errorMessage} = result.current;

        expect(errorMessage()).toBe(undefined);
    });
    
    
  
    it("should show error message for invalid validations", async () => {
        const testOnSignup = jest.fn();
        when(testOnSignup).calledWith(testName, testUsername, testEmail, testmobileNumber, "73479jakdkjsbadsdj", "usgdkusgfid8ew98")

        const renderHookResult = renderHook(() => useSignup(testOnSignup));
        const result = renderHookResult.result;
        const {handleSignup} = result.current;
        await act(() => handleSignup(SignupValues));
        const {errorMessage} = result.current;
        expect(errorMessage).toBeDefined();

    });

  

    it("should show error message if 401 returned", async () => {

        const testOnSignup = jest.fn();
        when(testOnSignup).calledWith(testName, testUsername, testEmail, testmobileNumber, testPassword, testConfirmPassword).mockRejectedValue({
        response: {status: 401}
        });
        const renderHookResult = renderHook(() => useSignup(testOnSignup));
        const result = renderHookResult.result;
        const {handleSignup} = result.current;
        await act(() => handleSignup(SignupValues));
        const {errorMessage} = result.current;
        
        const errorMessageComponent = shallow(errorMessage());
        expect(testOnSignup).toBeCalledTimes(1);
        expect(testOnSignup).toHaveBeenCalledWith(testName, testUsername, testEmail, testmobileNumber, testPassword, testConfirmPassword);
        expect(errorMessageComponent.text()).toBe("Signup failed");

    });

  

    it("should not show error message if non-401 error", async () => {

        const testOnSignup = jest.fn();
        const testError = "test error";
        when(testOnSignup).calledWith(testName, testUsername, testEmail, testmobileNumber, testPassword, testConfirmPassword).mockRejectedValue(testError);
        const renderHookResult = renderHook(() => useSignup(testOnSignup));
        const result = renderHookResult.result;
        const {handleSignup} = result.current;
        try {
        await act(() => handleSignup(SignupValues));
        fail("Error not rethrown");
        } catch (err) {
        const {errorMessage} = result.current;
        expect(testOnSignup).toBeCalledTimes(1);
        expect(testOnSignup).toHaveBeenCalledWith(testName, testUsername, testEmail, testmobileNumber, testPassword, testConfirmPassword);
        expect(errorMessage()).toBe(undefined);
        expect(err).toBe(testError);

        }

    });

});