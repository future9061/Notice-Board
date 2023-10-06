import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";
import "../../../style/components/ui/Reple/RepleArea.scss";

function RepleArea() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [submit, setSubmit] = useState(false);

  return (
    <div className="RepleArea">
      <RepleUpload
        postNum={params.postNum}
        user={user}
        setSubmit={setSubmit}
        submit={submit}
      />
      <RepleList postNum={params.postNum} user={user} submit={submit} />
    </div>
  );
}

export default RepleArea;
