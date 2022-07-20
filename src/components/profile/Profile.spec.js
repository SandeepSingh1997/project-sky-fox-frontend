import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "./Profile";
import {AppContext} from "../../context/app-context";

describe("Basic Rendering", () => {
  const dispatch = jest.fn();
  const state = {user:{"id": "1", "role": "Admin"}};

  it("should render change password button", () => {
    const profile = render( <AppContext.Provider value={{ state, dispatch }}><Profile /></AppContext.Provider>);

    const button = profile.getByRole("button", { name: /change password/i });

    expect(button).toBeDefined();
  });

  it("should open changePasswordPopup when click on change password button", () => {
    render( <AppContext.Provider value={{ state, dispatch }}><Profile /></AppContext.Provider>);


    const button = screen.getByRole("button", { name: /change password/i });

    expect(
      screen.queryByRole("heading", { name: /change password/i })
    ).toBeNull();

    fireEvent.click(button);

    expect(
      screen.getByRole("heading", { name: /change password/i })
    ).toBeDefined();
  });
});
