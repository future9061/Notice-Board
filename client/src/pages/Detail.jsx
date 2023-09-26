import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../style/pages/Detail.scss";

function Detail() {
  const params = useParams();
  const [post, setPost] = useState({});
  const postList = useSelector((state) => state.post);

  useEffect(() => {
    setPost(...postList.filter((a) => a.postNum === Number(params.postNum)));
  }, [postList]);

  return (
    <div className="Detail">
      <div className="inner">
        <div className="title">
          <h2>{post?.title}</h2>
          <p>작성자 이름</p>
          <small>작성 날짜</small>
        </div>
        <div className="content">
          {post?.img?.imgUrl && (
            <div>
              <img src={post.img?.imgUrl} alt={post.img?.caption} />
            </div>
          )}
          <p>{post?.content}</p>
        </div>
        <div className="buttons">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <div className="reply">
          <h5>
            댓글 <span>0</span>개
          </h5>
          <div className="write">
            <input type="text" placeholder="댓글 쓰기" />
            <div className="buttons">
              <button>취소</button>
              <button>등록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
