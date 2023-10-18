import React from "react";

function RepleEdit(props) {
  const editSubmit = (e) => {
    e.preventDefault();

    if (!reple) {
      alert("댓글을 작성해주세요");
      return;
    }

    const body = {
      reple: reple,
      user: user,
      postNum: Number(postNum),
    };

    axios
      .put("/api/reple/edit", body)
      .then((res) => {
        res.data.success && alert("댓글 작성이 성공하였습니다");
        setReple("");
      })
      .catch((err) => {
        console.log(err);
        alert("댓글 작성이 실패하였습니다.");
      });
  };

  const editCancle = (e) => {
    e.preventDefault();
    setReple("");
    setEditFlag(false);
  };

  return <div></div>;
}

export default RepleEdit;
