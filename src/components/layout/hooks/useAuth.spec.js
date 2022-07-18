import {act, renderHook} from "@testing-library/react-hooks";
import useAuth from "./useAuth";
import {isLoggedIn, login, logout, isSignedUp, signup} from "../../../helpers/authService";
import {when} from "jest-when";

jest.mock("../../../helpers/authService", () => ({
    __esModule: true,
    isLoggedIn: jest.fn(),
    login: jest.fn(),
    logout: jest.fn()
}));

describe("Basic logic", () => {

    it("should respect user's logged in status initially", () => {
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => useAuth());
        const {result, waitForNextUpdate} = renderHookResult;

        waitForNextUpdate();

        const {isAuthenticated} = result.current;
        expect(isAuthenticated).toBe(true);
    });

    it("should login successfuly", async () => {
        const testUsername = "testUsername";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => useAuth());
        const {result} = renderHookResult;
        when(login).calledWith(testUsername, testPassword).mockResolvedValue("userDetails");

        const {handleLogin} = result.current;

        let userDetails;
        await act(async () => {
            userDetails = await handleLogin(testUsername, testPassword);
        });

        const {isAuthenticated} = result.current;
        // noinspection JSUnusedAssignment
        expect(userDetails).toBe("userDetails");
        expect(isAuthenticated).toBe(true);
    });

    it("should not login if not authenticated", async () => {
        const testUsername = "testUsername";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(false);
        const renderHookResult = renderHook(() => useAuth());
        const {result} = renderHookResult;
        when(login).calledWith(testUsername, testPassword).mockRejectedValue("unused");

        const {handleLogin} = result.current;

        try {
            await act(async () => {
                await handleLogin(testUsername, testPassword);
                fail("Should not authenticate");
            });
        } catch (e) {
            const {isAuthenticated} = result.current;
            expect(isAuthenticated).toBe(false);
        }
    });

    it("should logout successfuly", () => {
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => useAuth());
        const {result} = renderHookResult;

        const {handleLogout} = result.current;
        act(() => {
            handleLogout();
        });

        const {isAuthenticated} = result.current;
        expect(logout).toBeCalledTimes(1);
        expect(isAuthenticated).toBe(false);
    });

    // it("should signup successfuly", async () => {
    //     const testName = "testName";
    //     const testUsername = "testUsername";
    //     const testEmail = "testEmail@email.com";
    //     const testmobileNumber = "1234567891";
    //     const testPassword = "testPassword";
    //     const testconfirmPassword = "testPassword";
        
    //     isSignedUp.mockReturnValue(true);
    //     const renderHookResult = renderHook(() => useAuth());
    //     const {result} = renderHookResult;
    //     when(signup).calledWith(testName, testUsername, testEmail, testmobileNumber, testPassword).mockResolvedValue("userDetails");

    //     const {handleSignup} = result.current;

    //     let userDetails;
    //     await act(async () => {
    //         userDetails = await handleSignup(testName, testUsername, testEmail, testmobileNumber, testPassword, testconfirmPassword);
    //     });

    //     const {isAuthenticated} = result.current;
    //     // noinspection JSUnusedAssignment
    //     expect(userDetails).toBe("userDetails");
    //     expect(isAuthenticated).toBe(true);
    // });


});
