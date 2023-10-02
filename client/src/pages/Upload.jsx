import React, { useEffect, useState } from "react";
import "../style/pages/Upload.scss";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ImgUpload from "../components/ui/ImgUpload";
import { useSelector } from "react-redux";

function Upload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState();
  const [btnTogg, setBtnTogg] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const today = new Date();

  const currentDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
  };

  const time = `${currentDate.year}년 ${currentDate.month}월 ${currentDate.date}일     ${currentDate.hours}:${currentDate.minutes}`;

  const handleValue = (e) => {
    e.target.id === "title"
      ? setTitle(e.target.value)
      : setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (btnTogg) {
      const currentUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      };

      let body = {
        title: title,
        content: content,
        img: img,
        user: currentUser,
        date: time,
      };

      axios
        .post("/api/submit", body)
        .then((res) => {
          res.data.sucess && console.log("요청 응답 성공");
        })
        .catch((err) => {
          console.log(err);
        });

      navigate("/");
    } else {
      alert("사진을 저장해주세요");
    }
  };

  return (
    <div className="Upload">
      <AiFillHome className="home-icon" />

      <form>
        <input
          type="text"
          id="title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => handleValue(e)}
        />
        <ImgUpload setImg={setImg} setBtnTogg={setBtnTogg} btnTogg={btnTogg} />
        <textarea
          placeholder="내용을 입력하세요"
          id="content"
          value={content}
          onChange={(e) => handleValue(e)}
        />
        <div className="buttons">
          <Link to="/">
            <button>취소</button>
          </Link>
          <button onClick={(e) => handleSubmit(e)}>업로드</button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
