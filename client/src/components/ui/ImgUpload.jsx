import React, { useState } from "react";
import "../../style/components/ui/ImgUpload.scss";
import axios from "axios";

function ImgUpload() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      await axios.post("/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Axios Error:", err);
    }
  };

  return (
    <form className="ImgUpload" onChange={(e) => submit(e)}>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        vale={caption}
        type="text"
        placeholder="사진의 설명을 적어주세요"
        onChange={(e) => setCaption(e.target.value)}
      />
    </form>
  );
}

export default ImgUpload;
