import React from "react";
import TopBar from "./ui/TopBar";
import NavBar from "./ui/NavBar";
import "../style/components/Header.scss";

function Header() {
  return (
    <div className="Header">
      <TopBar />
      <NavBar />
    </div>
  );
}

export default Header;
