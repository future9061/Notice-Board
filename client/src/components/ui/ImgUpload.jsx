import React, { useState } from "react";
import "../../style/components/ui/ImgUpload.scss";
import axios from "axios";

function ImgUpload({ setImg }) {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "multipart/form-data" };
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      const response = await axios.post("/api/images", formData, {
        headers,
      });

      setImg(response.data.imgData);
      // console.log("Response Data:", response.data.imgData);
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
        placeholder="사진의 설명을 적어주세요"
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={(e) => submit(e)}>이미지 저장</button>
    </form>
  );
}

export default ImgUpload;
