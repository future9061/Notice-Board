import React from "react";

import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user);

  return <div>Profile</div>;
}

export default Profile;
