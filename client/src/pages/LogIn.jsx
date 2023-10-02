import React, { useEffect, useState } from "react";
import "../style/pages/LogIn.scss";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  firebaseAuth,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
} from "../firebase.js";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/userSlice";

function LogIn() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!(Email && PW)) {
      alert("모든 항목을 채워주세요");
      return;
    }

    await setPersistence(firebaseAuth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(firebaseAuth, Email, PW)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            switch (err.code) {
              case "auth/invalid-email":
                setErrMsg("존재하지 않는 아이디 입니다");
                break;
              case "auth/invalid-login-credentials":
                setErrMsg("잘못된 비밀번호입니다");
                break;
              case "auth/wrong-password":
                setErrMsg("잘못된 비밀번호입니다");
                break;
            }
          });
      })
      .catch((err) => console.log("파이어베이스 로그인", err));
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
