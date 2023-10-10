import React, { useEffect, useState } from "react";
import "../../style/components/ui/MyPost.scss";
import axios from "axios";

//해당 로그인 uid와 post의 uid를 비교해서 해당되는 게시글만 보이게
function MyPost({ user }) {
  const [MyPost, setMyPost] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      axios
        .get("/api/profile/mypost", { params: { uid: user.uid } })
        .then((res) => {
          if (res.data.success) {
            setMyPost([...res.data.post]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="MyPost">
      <div className="inner">
        <h3>내가 작성한 게시글</h3>
        <div className="post-wrap">
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
}

export default MyPost;
