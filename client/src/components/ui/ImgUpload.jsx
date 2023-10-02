import React, { useState } from "react";
import "../../style/components/ui/ImgUpload.scss";
import axios from "axios";

function ImgUpload({ setImg }) {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [btnTogg, setBtnTogg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    caption && file
      ? setBtnTogg("gray")
      : alert("이미지를 고르고 설명을 채워주세요");
    const headers = { "Content-Type": "multipart/form-data" };
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      const response = await axios.post("/api/images", formData, {
        headers,
      });

      setImg(response.data.imgData);
    } catch (err) {
      console.error("Axios Error:", err);
    }
  };

  return (
    <form className="ImgUpload">
      <input
        className={btnTogg}
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        className={btnTogg}
        value={caption}
        type="text"
        placeholder="사진의 설명을 적어주세요"
        onChange={(e) => setCaption(e.target.value)}
      />
      {!btnTogg && <button onClick={(e) => submit(e)}>저장</button>}
    </form>
  );
}

export default ImgUpload;
