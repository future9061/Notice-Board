import React, { useState } from "react";
import "../style/pages/LogIn.scss";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { firebaseAuth, signInWithEmailAndPassword } from "../firebase.js";

function LogIn() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const curUserInfo = await signInWithEmailAndPassword(
        firebaseAuth,
        Email,
        PW
      );
      console.log("로그인", curUserInfo);

      //로그인 성공하면 리덕스에 넣기  setUser(curUserInfo.user);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setErrMsg("존재하지 않는 아이디 입니다");
          break;
        case "auth/invalid-login-credentials":
          setErrMsg("잘못된 비밀번호입니다");
          break;
      }
    }
  };
  return (
    <div className="LogIn">
      <Link to="/">
        <AiFillHome className="home-icon" />
      </Link>
      <form>
        <input
          type="email"
          placeholder="이메일"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={PW}
          onChange={(e) => setPW(e.target.value)}
        />
        {errMsg && <p>{errMsg}</p>}
        <div className="buttons">
          <button onClick={(e) => handleLogin(e)}>로그인</button>
          <Link to="/register">
            <button>회원가입 하러가기</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
