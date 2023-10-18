import React, { useState } from "react";
import "../../../style/components/ui/Reple/RepleUpload.scss";
import axios from "axios";

function RepleUpload({ postNum, user }) {
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
      .post("/api/post/reple", body)
      .then((res) => {
        res.data.success && alert("댓글 작성이 성공하였습니다");
        setReple("");
      })
      .catch((err) => {
        console.log(err);
        alert("댓글 작성이 실패하였습니다.");
      });
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setReple("");
  };

  return (
    <div className="RepleUpload">
      <RepleInput
        onSubmit={handleSubmit}
        onClick={handleCancle}
        setReple={setReple}
        reple={reple}
      />
    </div>
  );
}

function RepleInput({ onSubmit, onClick, setReple, reple }) {
  return (
    <div>
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
          <button onClick={(e) => onClick(e)}>취소</button>
          <button onSubmit={(e) => onSubmit(e)}>등록</button>
        </div>
      </form>
    </div>
  );
}

export { RepleInput };

export default RepleUpload;
