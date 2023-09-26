import React from "react";
import "../../style/components/ui/PostItem.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostItem() {
  const post = useSelector((state) => state.post);

  return (
    <div className="PostItem">
      {post.map((elem) => {
        return (
          <div key={elem.postNum}>
            <Link to={`/detail/${elem.postNum}`}>
              <h5>{elem.title}</h5>
              <img src={elem.img.imgUrl} alt="썸네일" />
              <p>{elem.content}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PostItem;
