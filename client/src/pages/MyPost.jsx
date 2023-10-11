import React, { useEffect, useState } from "react";
import "../style/pages/MyPost.scss";
import axios from "axios";
import { useSelector } from "react-redux";
//해당 로그인 uid와 post의 uid를 비교해서 해당되는 게시글만 보이게
function MyPost() {
  const [MyPost, setMyPost] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.uid) {
      const uid = user.uid;
      axios.post(`/api/mypost`, { uid }).then((res) => {
        if (res.data.success) {
          setMyPost(res.data.post);
        }
      });
    }
  }, [user]);

  return (
    <div className="MyPost">
      <h3>작성한 글</h3>
      <div className="inner">
        {MyPost.map((a, idx) => {
          return (
            <div className="item" key={idx}>
              <img src={a.img.imgUrl} alt={a.img.caption} />
              <h4>{a.title}</h4>
              <p>{a.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPost;
