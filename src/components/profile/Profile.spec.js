import React from "react";
import {render} from "@testing-library/react";
import Profile from "./Profile";


describe("Basic Rendering",()=>{

    it("should render change password button",()=>{
        const profile= render(<Profile/>);

        const button=profile.getByRole('button',{name:/change password/i});

        expect(button).toBeDefined();
    });

    
})