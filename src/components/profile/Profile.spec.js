import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "./Profile";

describe("Basic Rendering", () => {
  it("should render change password button", () => {
    const profile = render(<Profile />);

    const button = profile.getByRole("button", { name: /change password/i });

    expect(button).toBeDefined();
  });

  it("should open changePasswordPopup when click on change password button", () => {
    render(<Profile />);

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
