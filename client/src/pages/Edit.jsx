import React, { useEffect, useState } from "react";
import ImgUpload from "../components/ui/ImgUpload";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/pages/Edit.scss";

function Edit() {
  const params = useParams();
  const postList = useSelector((state) => state.post);
  const post = postList.filter((a) => a.postNum === Number(params.postNum));
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    console.log(post[0]?.title);
  }, []);
  return (
    <div className="Edit">
      <form>
        <input type="text" value={editTitle} />
        <ImgUpload />
        <textarea />
        <input type="text" />
        <div>
          {/* <Link to=`/detail`>
            <button>취소</button>
          </Link> */}
          <button>수정</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
