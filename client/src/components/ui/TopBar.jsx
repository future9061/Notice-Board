import React, { useState } from "react";
import "../../style/components/ui/TopBanner.scss";
import { AiFillApi } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

//평소에는 opacity 0
//1초마다 나타난다.
function TopBar() {
  return (
    <div className="TopBar">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="tab">
        <AiFillApi className="api-icon" />
        <p>For developers</p>
      </div>
      <BiPlus className="plus-icon" />
    </div>
  );
}

export default TopBar;
