import React, { useState } from "react";
import "../style/pages/Register.scss";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!(Name && Email && PW && PWConfirm)) {
      alert("모든 항목을 채워주세요");
    }
    if (PW !== PWConfirm) {
      alert("비밀번호가 일치하지 않습니다");
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
    });

    console.log(createdUser);
  };

  return (
    <div className="Register">
      <Link to="/">
        <AiFillHome className="home-icon" />
      </Link>

      <form>
        <input
          type="name"
          placeholder="이름"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPW(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 재확인"
          onChange={(e) => {
            setPWConfirm(e.target.value);
          }}
        />
        <div className="buttons">
          <button onClick={(e) => handleRegister(e)}>회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
