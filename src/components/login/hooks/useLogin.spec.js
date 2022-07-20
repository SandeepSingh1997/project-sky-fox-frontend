import {act, renderHook} from "@testing-library/react-hooks";
import useLogin from "./useLogin";
import React, { useContext } from "react";
import {when} from "jest-when";
import {shallow} from "enzyme";
import {AppContext} from "../../../context/app-context";

const history = {replace: jest.fn()};
describe("Basic logic", () => {

    const testUsername = "testUsername";
    const testPassword = "testPassword";
    const loginValues = {
        username: testUsername,
        password: testPassword
    };
    const state={user:{"id": "1", "role": "Admin"}};
    const dispatch=jest.fn();
    const wrapper=({children})=>{
       return (<AppContext.Provider value={{state,dispatch}}>
            {children}
        </AppContext.Provider>);
    };
    

    it("should initially not show error message", () => {
        const testOnLogin = jest.fn();
        const renderHookResult = renderHook(() => useLogin(testOnLogin, history),{wrapper:wrapper});
        const result = renderHookResult.result;
        const {errorMessage} = result.current;

        expect(errorMessage()).toBe(undefined);
    });

    it("should not show error message if signed up  succesfully", async () => {
        const testOnLogin = jest.fn();
        when(testOnLogin).calledWith(testUsername, testPassword).mockResolvedValue("Unused");
   
    
        
        const renderHookResult = renderHook(() => useLogin(testOnLogin, history),{wrapper:wrapper});
        const result = renderHookResult.result;
        const {handleLogin} = result.current;

        await act(() => handleLogin(loginValues));

        const {errorMessage} = result.current;
        expect(testOnLogin).toBeCalledTimes(1);
        expect(testOnLogin).toHaveBeenCalledWith(testUsername, testPassword);
        expect(errorMessage()).toBe(undefined);
    });

    it("should show error message if 401 returned", async () => {
        const testOnLogin = jest.fn();
        when(testOnLogin).calledWith(testUsername, testPassword).mockRejectedValue({
            response: {
                status: 401
            }
        });
        const renderHookResult = renderHook(() => useLogin(testOnLogin, history),{wrapper:wrapper});
        const result = renderHookResult.result;
        const {handleLogin} = result.current;

        await act(() => handleLogin(loginValues));

        const {errorMessage} = result.current;
        const errorMessageComponent = shallow(errorMessage());
        expect(testOnLogin).toBeCalledTimes(1);
        expect(testOnLogin).toHaveBeenCalledWith(testUsername, testPassword);
        expect(errorMessageComponent.text()).toBe("Login failed");
    });

    it("should not show error message if non-401 error", async () => {
        const testOnLogin = jest.fn();
        const testError = "test error";
        when(testOnLogin).calledWith(testUsername, testPassword).mockRejectedValue(testError);
        const renderHookResult = renderHook(() => useLogin(testOnLogin, history),{wrapper:wrapper});
        const result = renderHookResult.result;
        const {handleLogin} = result.current;

        try {
            await act(() => handleLogin(loginValues));
            fail("Error not rethrown");
        } catch (err) {
            const {errorMessage} = result.current;
            expect(testOnLogin).toBeCalledTimes(1);
            expect(testOnLogin).toHaveBeenCalledWith(testUsername, testPassword);
            expect(errorMessage()).toBe(undefined);
            expect(err).toBe(testError)
        }
    });
});
