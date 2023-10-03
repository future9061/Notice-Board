import React from "react";
import "../../style/components/ui/TopBar.scss";
import { BsPen, BsCodeSquare, BsGithub } from "react-icons/bs";

import { HiOutlineEllipsisVertical } from "react-icons/hi2";
function TopBar() {
  return (
    <div className="TopBar">
      <div className="TopBar-inner">
        <div>
          <BsPen className="pen" />
          <p>교육</p>
        </div>
        <div>
          <ul>
            <a
              href="https://github.com/future9061/for-developers"
              target="_blank"
            >
              <li>
                <BsCodeSquare className="icon" />
              </li>

              <li className="show">코드 보러 가기</li>
            </a>
          </ul>
          <HiOutlineEllipsisVertical />
          <ul>
            <a href="https://github.com/future9061" target="_blank">
              <li>
                <BsGithub className="icon" />
              </li>
              <li className="show">깃 허브 놀러가기</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
