import React from "react";
import { BiSearch } from "react-icons/bi";
import "../../style/components/ui/SideMenu.scss";

function SideMenu() {
  return (
    <div className="SideMenu">
      <div className="search">
        <form>
          <BiSearch className="search-icon" />
          <input type="search" placeholder="Search" />
        </form>
      </div>
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </div>
  );
}

export default SideMenu;
