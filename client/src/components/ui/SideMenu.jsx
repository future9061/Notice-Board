import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import "../../style/components/ui/SideMenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SideMenu() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePath = (e) => {
    user.uid ? navigate("/create") : alert("로그인 시 이용할 수 있습니다.");
  };

  return (
    <div className="SideMenu">
      <div className="search">
        <form>
          <BiSearch className="search-icon" />
          <input type="search" placeholder="Search" />
        </form>
      </div>
      <ul>
        <li onClick={(e) => handlePath(e)}>글 쓰기</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </div>
  );
}

export default SideMenu;
