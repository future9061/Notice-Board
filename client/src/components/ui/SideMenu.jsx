import React from "react";
import { BiSearch } from "react-icons/bi";
import "../../style/components/ui/SideMenu.scss";
import { Link } from "react-router-dom";

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
        <Link to="/create">
          <li>글 쓰기</li>
        </Link>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </div>
  );
}

export default SideMenu;
