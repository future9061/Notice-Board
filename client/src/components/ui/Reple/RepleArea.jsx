import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";
import "../../../style/components/ui/Reple/RepleArea.scss";
import axios from "axios";

function RepleArea() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [repleList, setRepleList] = useState([]);
  const [repleNum, setRepleNum] = useState();

  useEffect(() => {
    axios
      .get("/api/reple", { params: { postNum: params.postNum } })
      .then((res) => {
        if (res.data.success) {
          setRepleList([...res.data.repleList]);
          setRepleNum(res.data.repleNum);
        }
      });
  }, []);

  return (
    <div className="RepleArea">
      <h5>
        댓글 <span>{repleNum}</span>개
      </h5>
      <RepleUpload postNum={params.postNum} user={user} />
      <RepleList repleList={repleList} user={user} />
    </div>
  );
}

export default RepleArea;
