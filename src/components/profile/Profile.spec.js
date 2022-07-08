import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Profile from "./Profile";


describe("Basic Rendering",()=>{

    it("should render change password button",()=>{
        const profile= render(<Profile/>);

        const button=profile.getByRole('button',{name:/change password/i});

        expect(button).toBeDefined();
    });

    it("should be able to click on the change password button",()=>{
        const changePassword = jest.fn();

        const profile= render(<Profile onChangePassword={changePassword}/>);

        const button=profile.getByRole('button',{name:/change password/i});

        fireEvent.click(button);

        expect(changePassword).toBeCalledTimes(1);
    });
    
})