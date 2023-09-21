import React from "react";
import "../style/pages/LogIn.scss";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <div className="LogIn">
      <Link to="/">
        <AiFillHome className="home-icon" />
      </Link>
      <form>
        <input type="email" placeholder="이메일" />
        <input type="password" placeholder="비밀번호" />
        <div className="buttons">
          <button>로그인</button>
          <Link to="/register">
            <button>회원가입 하러가기</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
