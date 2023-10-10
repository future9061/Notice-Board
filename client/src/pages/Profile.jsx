import React from "react";
import MyPost from "../components/ui/MyPost";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      Profile
      <MyPost user={user} />
    </div>
  );
}

export default Profile;
