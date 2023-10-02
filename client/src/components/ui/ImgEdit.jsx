import React, { useEffect, useState } from "react";
import "../../style/components/ui/ImgUpload.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function ImgEdit({ setEditImg }) {
  const postList = useSelector((state) => state.post);
  const params = useParams();
  const post = postList.filter((a) => a.postNum === Number(params.postNum));
  const [file, setFile] = useState();
  const [caption, setCaption] = useState(post[0]?.img.caption);

  const submit = async (e) => {
    e.preventDefault();
    // caption && file
    //   ? setBtnTogg("gray")
    //   : alert("이미지를 고르고 설명을 채워주세요");
    const headers = { "Content-Type": "multipart/form-data" };

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      const response = await axios.put(
        `/api/edit/images/${params.postNum}`,
        formData,
        {
          headers,
        }
      );
      setEditImg(response.data.imgData);
    } catch (err) {
      console.error("Axios Error:", err);
    }
  };

  return (
    <form className="ImgUpload">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        value={caption}
        type="text"
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={(e) => submit(e)}>저장</button>
    </form>
  );
}

export default ImgEdit;
