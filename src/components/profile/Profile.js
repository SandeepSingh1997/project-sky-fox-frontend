import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ChangePasswordPopup from "./ChangePasswordPopup";
import styles from "./styles/profileStyles";

const Profile = (props) => {
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  const classes = styles();
  const handleDialogClose = () => {
    setChangePasswordDialog(false);
  };

  return (
    <div>
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
    </div>
  );
};

export default Profile;
