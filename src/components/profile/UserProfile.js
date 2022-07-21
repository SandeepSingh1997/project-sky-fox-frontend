import React from 'react'
import { Typography, Box } from '@material-ui/core'
import styles from "./styles/profileStyles";

const UserProfile = ({ userDetails }) => {
    const classes = styles();
    return (
        <div>
            <Box pb={1}>
                <Typography variant="h5" className={classes.heading}>User Profile</Typography>
            </Box>
            <p className={classes.para}><b>Name:</b> {userDetails.name}</p>
            <p className={classes.para}><b>Username:</b> {userDetails.username}</p>
            <p className={classes.para}><b>Email:</b> {userDetails.email}</p>
            <p className={classes.para}><b>Mobile Number:</b> {userDetails.mobile}</p>
        </div>
    )
}

export default UserProfile;
