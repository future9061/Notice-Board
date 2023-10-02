import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/pages/Edit.scss";
import ImgEdit from "../components/ui/ImgEdit";
import axios from "axios";

function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const postList = useSelector((state) => state.post);
  const post = postList.filter((a) => a.postNum === Number(params.postNum));
  const [editTitle, setEditTitle] = useState(post[0]?.title);
  const [editContent, setEditContent] = useState(post[0]?.content);
  const [editImg, setEditImg] = useState();
  const user = useSelector((state) => state.user);
  const today = new Date();

  const currentDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
  };

  const time = `${currentDate.year}년 ${currentDate.month}월 ${currentDate.date}일     ${currentDate.hours}:${currentDate.minutes}`;

  const currentUser = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const body = {
      postNum: params.postNum,
      title: editTitle,
      content: editContent,
      img: editImg,
      user: currentUser,
      date: time,
    };

    await axios
      .put(`/api/edit/${body.postNum}`, body)
      .then((res) => {
        if (res.data.success) {
          alert("게시글 수정이 완료되었습니다.");
          navigate("/");
        }
      })
      .catch((err) => console.log("에딧 에러", err));
  };

  return (
    <div className="Edit">
      <form>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <ImgEdit setEditImg={setEditImg} />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <div className="buttons">
          <Link to={`/detail/${params.postNum}`}>
            <button>취소</button>
          </Link>
          <button onClick={(e) => handleEdit(e)}>수정</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
