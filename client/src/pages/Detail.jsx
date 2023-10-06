import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../style/pages/Detail.scss";
import axios from "axios";
import Reple from "../components/ui/Reple/RepleArea";
import RepleArea from "../components/ui/Reple/RepleArea";

function Detail() {
  const params = useParams();
  const [post, setPost] = useState({});
  const postList = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setPost(...postList.filter((a) => a.postNum === Number(params.postNum)));
  }, [postList]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`/api/remove/${post.postNum}`)
      .then((res) => {
        res.data.success && alert("게시글이 삭제되었습니다.");
        navigate("/");
      })
      .catch((err) => console.log("삭제 에러", err));
  };

  return (
    <div className="Detail">
      <div className="inner">
        <div className="title">
          <h2>{post?.title}</h2>
          <p>{post?.user?.displayName}</p>
          <small>{post?.date}</small>
        </div>
        <div className="content">
          {post?.img?.imgUrl && (
            <div>
              <img src={post.img?.imgUrl} alt={post.img?.caption} />
            </div>
          )}
          <p>{post?.content}</p>
        </div>

        {user.uid === post?.user?.uid && (
          <div className="buttons">
            <button onClick={() => navigate(`/edit/${post.postNum}`)}>
              수정
            </button>
            <button onClick={(e) => handleDelete(e)}>삭제</button>
          </div>
        )}
      </div>
      <RepleArea />
    </div>
  );
}

export default Detail;
