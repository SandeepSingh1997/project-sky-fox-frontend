import {act, renderHook} from "@testing-library/react-hooks";
import useSignup from "./useSignup";
import React from "react";
import {when} from "jest-when";
import {shallow} from "enzyme";

describe("Basic logic", () => {

    const testUsername = "testUsername";
    const testPassword = "testPassword";
    const SignupValues = {
        name: testUsername,
        username: testUsername,
        password: testPassword
    };

    it("should initially not show error message", () => {
        const testOnSignup = jest.fn();
        const renderHookResult = renderHook(() => useSignup(testOnSignup));
        const result = renderHookResult.result;
        const {errorMessage} = result.current;

        expect(errorMessage()).toBe(undefined);
    });

});
