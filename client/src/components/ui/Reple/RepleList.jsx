import React from "react";
import "../../../style/components/ui/Reple/RepleList.scss";
import RepleContent from "./RepleContent";

function RepleList({ repleList, user }) {
  return (
    <div className="RepleList">
      {repleList.map((elem, idx) => {
        return <RepleContent elem={elem} idx={idx} user={user} />;
      })}
    </div>
  );
}

export default React.memo(RepleList);
