import React from "react";

const Profile=(props)=>{

    return <div>
        <button onClick={props.onChangePassword}>Change Password</button>
    </div>;
}

export default Profile;