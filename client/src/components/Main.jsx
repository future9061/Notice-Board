import React from "react";
import SideMenu from "./ui/SideMenu";
import PostItem from "./ui/PostItem";
import "../style/components/Main.scss";

function Main() {
  return (
    <div className="Main">
      <SideMenu />
      <PostItem />
    </div>
  );
}

export default Main;
