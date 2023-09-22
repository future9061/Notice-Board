import React, { useState } from "react";
import "../../style/components/ui/ImgUpload.scss";
import axios from "axios";

function ImgUpload() {
  const [file, setFile] = useState();

  const FileUpload = (e) => {
    e.preventDefault();

    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("/api/image", formData)
      .then((res) => {
        res.data.success && console.log("이미지 전송 성공");
      })
      .catch((err) => console.log("이미지업로드", err));
  };

  return (
    <form className="ImgUpload" enctype="multipart/form-data">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </form>
  );
}

export default ImgUpload;
