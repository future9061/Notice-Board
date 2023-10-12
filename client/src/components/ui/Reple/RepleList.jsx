import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../style/components/ui/Reple/RepleList.scss";
import RepleContent from "./RepleContent";

function RepleList({ postNum, submit }) {
  const [repleList, setRepleList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reple/showReple", { params: { postNum: postNum } })
      .then((res) => {
        if (res.data.success) {
          setRepleList([...res.data.repleList]);
          console.log(repleList);
        }
      });
  }, [submit]);

  return (
    <div className="RepleList">
      {repleList.map((elem, idx) => {
        return <RepleContent elem={elem} idx={idx} />;
      })}
    </div>
  );
}

export default RepleList;
