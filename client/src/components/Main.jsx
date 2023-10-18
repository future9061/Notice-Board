import React, { useEffect } from "react";
import PostItem from "./ui/PostItem";
import "../style/components/Main.scss";
import Search from "./ui/Search";
import Button from "./ui/Button";
import { BsPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { getPost } from "../store/postSlice";

function Main() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUpload = () => {
    user.uid ? navigate("/create") : alert("로그인 후 이용할 수 있습니다.");
  };

  useEffect(() => {
    axios
      .get("/api/home")
      .then((res) => {
        res.data.success && dispatch(getPost(res.data.post));
      })
      .catch((err) => console.log("클라이언트 에러", err));
  }, []);

  return (
    <div className="Main">
      <Search />
      <div className="btn-wrap">
        <Button
          text="글 쓰기"
          bgColor="#5BD6C0"
          color="#fff"
          icon={<BsPencilFill />}
          onClick={(e) => {
            handleUpload(e);
          }}
        />
      </div>

      <PostItem />

      <Footer />
    </div>
  );
}

export default Main;
