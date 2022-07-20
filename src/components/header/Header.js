import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./styles/headerStyles";
import PropTypes from "prop-types";
import PersonIcon from "@material-ui/icons/Person";
import { FeatureToggleProvider, FeatureToggle } from "react-feature-toggles";
import { featureNames } from "../../config/env-config";
import useFeatureTogglz from '../common/hooks/useFeatureTogglz';


const Header = ({ onLogout, isAuthenticated }) => {
  const classes = styles();

  const { features } = useFeatureTogglz();


  const logoutSection = () => {
    if (isAuthenticated) {
      return (
        <div onClick={onLogout} className={classes.logoutLink}>
          <ExitToAppIcon />
          <Typography className={classes.headerLogo} variant="body1">
            Logout
          </Typography>
        </div>
      );
    }
  };

  const profileSection = () => {
    if (isAuthenticated) {
      return (
        
        <a href="/profile" className={classes.profileLink} >
          <PersonIcon />
        </a>
        
      );
    }
  };

  return (
    <FeatureToggleProvider featureToggleList={features}>
      <AppBar position={"sticky"}>
        <Toolbar className={classes.toolbar}>
          <a href="/" className={classes.headerLink}>
            <MovieIcon className={classes.cinemaLogoIcon} />
            <Typography className={classes.headerLogo} variant="h5">
              SkyFox Cinema
            </Typography>
          </a>
        <div className={classes.authenticatedSection}>
          <FeatureToggle featureName={featureNames.CHANGE_PASSWORD_FOR_ADMIN_FEATURE}>
            {profileSection()}
          </FeatureToggle>
          {logoutSection()}
        </div>
        </Toolbar>
      </AppBar>
    </FeatureToggleProvider>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
