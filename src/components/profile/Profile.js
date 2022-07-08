import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ChangePasswordPopup from "./ChangePasswordPopup";

const Profile = (props) => {
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setChangePasswordDialog(true);
        }}
      >
        Change Password
      </Button>
      {changePasswordDialog && (
        <ChangePasswordPopup />
      )}
    </div>
  );
};

export default Profile;
