import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../style/components/ui/Reple/RepleList.scss";
import Button from "../Button";

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
        return (
          <div key={idx} className="item">
            <div className="profile">
              <div className="img_wrap">
                <img src={elem.user.photoURL} alt={elem.user.photoURL} />
              </div>
              <span>{elem.user.displayName}</span>
            </div>
            <div className="text">
              <p>{elem.reple}</p>
              <div className="buttons">
                <Button text="수정" />
                <Button text="삭제" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RepleList;
