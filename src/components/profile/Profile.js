import React, { useState, useContext, useEffect } from "react";
import { Button, Box } from "@material-ui/core";
import ChangePasswordPopup from "./ChangePasswordPopup";
import styles from "./styles/profileStyles";
import { AppContext } from "../../context/app-context";
import profileServices from "./services/profileServices";
import UserProfile from "./UserProfile";

const Profile = (props) => {
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  const classes = styles();
  const handleDialogClose = () => {
    setChangePasswordDialog(false);
  };

  const { state } = useContext(AppContext);

  const [userDetails, setUserDetails] = useState({ "name": "", "username": "", "email": "", "mobile": "" });

  useEffect(() => {
    if (state.user.role === "Customer") {
      profileServices.getUserDetails(state.user.id).then(userDetails => {
        setUserDetails(userDetails);
      })
    }
  }, [state]);
  return (
    <Box m={3}>
      {state.user.role === "Customer" ? (
        <UserProfile userDetails={userDetails} />
      ) : null}
      <Button
        variant="contained"
        onClick={() => {
          setChangePasswordDialog(true);
        }}
        className={classes.button}
        size="large"
      >
        Change Password
      </Button>
      {changePasswordDialog && (
        <ChangePasswordPopup
          open={changePasswordDialog}
          handleDialogClose={handleDialogClose}
          {...props}
        />
      )}
    </Box>
  );
};

export default Profile;
