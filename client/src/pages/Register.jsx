import React, { useEffect, useRef, useState } from "react";
import "../style/pages/Register.scss";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  storage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "../firebase.js";
import { BiSolidUser } from "react-icons/bi";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [photo, setPhoto] = useState();
  const photoRef = useRef();
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!(Name && Email && PW && PWConfirm)) {
      alert("모든 항목을 채워주세요");
      return;
    }
    if (PW !== PWConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      await createUserWithEmailAndPassword(firebaseAuth, Email, PW);

      const storageRef = ref(storage);
      const fileRef = ref(storageRef, `${firebaseAuth.currentUser.uid}`);

      const metadata = { contentType: photo.type };
      await uploadBytes(fileRef, photo, metadata);
      const fileUrl = await getDownloadURL(ref(storage, fileRef));

      await updateProfile(firebaseAuth.currentUser, {
        displayName: Name,
        photoURL: fileUrl,
      });

      alert("회원가입이 완료되었습니다");
      navigate("/login");
    } catch (err) {
      switch (err.code) {
        case "auth/weak-password":
          setErrMsg("비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          setErrMsg("잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          setErrMsg("이미 가입되어 있는 계정입니다");
          break;
      }
    }
  };

  return (
    <div className="Register">
      <Link to="/">
        <AiFillHome className="home-icon" />
      </Link>

      <form>
        <div className="photo">
          {"" ? (
            <div>{/* <img src={photo} alt={photo} /> */}</div>
          ) : (
            <div>
              <BiSolidUser />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={photoRef}
            onChange={(e) => handleFileSelect(e)}
          />
        </div>
        <input
          type="name"
          placeholder="이름"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="이메일"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={PW}
          onChange={(e) => {
            setPW(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 재확인"
          value={PWConfirm}
          onChange={(e) => {
            setPWConfirm(e.target.value);
          }}
        />
        {errMsg && <p>{errMsg}</p>}
        <div className="buttons">
          <button onClick={(e) => handleRegister(e)}>회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
