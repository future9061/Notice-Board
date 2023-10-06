import React, { useState } from "react";
import "../../../style/components/ui/Reple/RepleUpload.scss";
import axios from "axios";

function RepleUpload({ postNum, user, setSubmit, submit }) {
  const [reple, setReple] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reple) {
      alert("댓글을 작성해주세요");
      return;
    }

    if (!user.uid) {
      alert("로그인 후 댓글 작성해주세요");
      setReple("");
      return;
    }

    const body = {
      reple: reple,
      user: user,
      postNum: Number(postNum),
    };

    axios
      .post("/api/reple/submit", body)
      .then((res) => {
        res.data.success && alert("댓글 작성이 성공하였습니다");
        setReple("");
        setSubmit(!submit);
      })
      .catch((err) => {
        console.log(err);
        alert("댓글 작성이 실패하였습니다.");
      });
  };

  return (
    <div className="RepleUpload">
      <h5>
        댓글 <span>0</span>개
      </h5>
      <form className="write">
        <input
          type="text"
          placeholder="댓글 쓰기"
          value={reple}
          onChange={(e) => {
            setReple(e.target.value);
          }}
        />
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              setReple("");
            }}
          >
            취소
          </button>
          <button onClick={(e) => handleSubmit(e)}>등록</button>
        </div>
      </form>
    </div>
  );
}

export default RepleUpload;
