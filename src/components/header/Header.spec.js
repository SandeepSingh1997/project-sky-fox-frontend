import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import { Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

jest.mock('../common/hooks/useFeatureTogglz', () => ({
  __esModule: true,
  default: jest.fn(() => {
      return {features: {CHANGE_PASSWORD_FOR_ADMIN_FEATURE: true}};
  })
}));

describe("Basic rendering", () => {
  const testOnLogout = jest.fn();

  it("Should not render the logout section if not authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={false} onLogout={testOnLogout} />
    );

    const typographyComponent = headerComponent.find(Typography);
    const missingLogoutDivComponent = headerComponent.find("div").at(1);
    expect(missingLogoutDivComponent.length).toBe(0);
    expect(typographyComponent.length).toBe(1);
    expect(typographyComponent.text()).toBe("SkyFox Cinema");
  });

  it("Should render the logout section if authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={true} onLogout={testOnLogout} />
    );

    const typographyComponents = headerComponent.find(Typography);
    const logoTypographyComponent = typographyComponents.at(0);
    const logoutDivComponent = headerComponent.find("div").at(1);
    const logoutTypographyComponent = typographyComponents.at(1);
    expect(logoutDivComponent.prop("onClick")).toBe(testOnLogout);
    expect(logoutTypographyComponent.text()).toBe("Logout");
    expect(logoTypographyComponent.length).toBe(1);
    expect(logoTypographyComponent.text()).toBe("SkyFox Cinema");
  });

  it("Should render the profile icon if authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={true} onLogout={testOnLogout} />
    );

    const profileIconComponent = headerComponent.find(PersonIcon);

    expect(profileIconComponent.length).toBe(1);
  });
});
