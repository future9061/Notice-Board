import React, { useEffect, useState } from "react";
import "../../style/components/ui/NavBar.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPostcard } from "react-icons/bs";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineLogout,
} from "react-icons/ai";
import { signOut, firebaseAuth } from "../../firebase.js";
import { userLogin } from "../../store/userSlice";

function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [slide, setSlide] = useState("");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(firebaseAuth)
      .then(() => {
        dispatch(userLogin({}));
      })
      .catch((err) => {
        console.log("로그아웃 에러", err);
      });
  };

  return (
    <nav className="NavBar">
      <div className="NavBar-inner">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo" />
        </div>

        {!user.uid ? (
          <div className="buttons">
            <button onClick={() => navigate("/login")}>로그인</button>

            <button onClick={() => navigate("/register")}>회원가입</button>
          </div>
        ) : (
          <div
            className="profile"
            onMouseEnter={() => setSlide("show")}
            onMouseLeave={() => setSlide("")}
          >
            <div className="photo">
              <img src={user.photoURL} alt={user.photoURL} />
            </div>
            <div className="name">
              <span>{user.displayName}</span>
              <p>님 안녕하세요!</p>
            </div>
            <ul className={`menu ${slide}`}>
              <li>
                <BsPostcard />
                <p>내 정보</p>
              </li>

              <li onClick={() => navigate(`/mypost`)}>
                <BsPostcard />
                <p>작성한 게시글</p>
              </li>

              <li>
                <AiOutlineComment />
                <p>작성한 댓글</p>
              </li>
              <li>
                <AiOutlineHeart />
                <p>좋아요</p>
              </li>
              <li
                onClick={(e) => {
                  handleLogout(e);
                }}
              >
                <AiOutlineLogout />
                <p>로그아웃</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
