import React from "react";
import "../../style/components/ui/PostItem.scss";
import { useSelector } from "react-redux";

function PostItem() {
  const post = useSelector((state) => state.post);

  return (
    <div className="PostItem">
      {post.map((elem) => {
        return (
          <div>
            <h5>{elem.title}</h5>
            <img src="" alt="썸네일" />
            <p>{elem.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PostItem;
