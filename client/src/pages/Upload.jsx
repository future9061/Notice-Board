import React, { useState } from "react";
import "../style/pages/Upload.scss";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import ImgUpload from "../components/ui/ImgUpload";

function Upload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleValue = (e) => {
    e.target.id === "title"
      ? setTitle(e.target.value)
      : setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      title: title,
      content: content,
    };

    axios
      .post("/api/submit", body)
      .then((res) => {
        res.data.sucess && console.log("요청 응답 성공");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <ImgUpload />
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
