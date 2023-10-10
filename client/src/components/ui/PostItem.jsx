import React, { useEffect } from "react";
import "../../style/components/ui/PostItem.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostItem() {
  const post = useSelector((state) => state.post);

  useEffect(() => {
    console.log("post", post);
  }, []);

  return (
    <div className="PostItem">
      <div className="PostItem-inner">
        {post.map((elem) => {
          return (
            <div key={elem.postNum} className="item">
              <Link to={`/detail/${elem.postNum}`}>
                <img src={elem.img.imgUrl} alt={elem.img.caption} />
                <div className="text-wrap">
                  <h5>{elem.title}</h5>
                  <p>{elem.content}</p>
                  <span>더 보기...</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostItem;
